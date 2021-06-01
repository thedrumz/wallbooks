import { Book } from "@/types/Book";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";

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

export const deleteBook = (bookId: string) => {
  firebase
    .firestore()
    .collection("books")
    .doc(bookId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export const createBook = (book: Book): Promise<Book> => {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (!user?.uid) reject("Error getting books: No logged user found");

    firebase
      .firestore()
      .collection("books")
      .add({ ...book, id: uuidv4(), userId: user?.uid })
      .then(() => {
        resolve(book);
      })
      .catch((error) => {
        console.error("Error getting books: ", error);
        reject(error);
      });
  });
};
