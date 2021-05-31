import { User } from "@/types/User";
import firebase from "firebase";

export const loginUser = async (loginData: User): Promise<void> => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(loginData.email, loginData.password);
    })
    .then((e) => {
      console.log(e);
    })
    .catch((error) => {
      console.log(error.message);
      throw new Error(error.message);
    });
};

export const createUser = async (loginData: User): Promise<void> => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(loginData.email, loginData.password)
    .then((e) => {
      console.log(e);
    })
    .catch((error) => {
      console.log(error.message);
      throw new Error(error.message);
    });
};

export const getLogedUser = async (): Promise<firebase.User | null> => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    }, reject);
  });
};
