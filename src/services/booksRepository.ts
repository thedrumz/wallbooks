import { Book } from "@/types/Book";
import firebase from "firebase";

export const getBooks = (): Promise<Array<Book>> => {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (!user?.uid) reject("Error getting books: No logged user found");

    firebase
      .firestore()
      .collection("books")
      .where("userId", "==", user?.uid)
      .get()
      .then((querySnapshot) => {
        const books: Array<Book> = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const book: Book = {
            id: doc.id,
            imageUrl: data.imageUrl,
            title: data.title,
            author: data.author,
            description: data.description,
            publishDate: data?.publishDate?.toDate(),
          };
          books.push(book);
        });
        resolve(books);
      })
      .catch((error) => {
        console.error("Error getting books: ", error);
        reject(error);
      });
  });
};
