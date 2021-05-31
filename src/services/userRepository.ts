import { User, Auth } from "@/types/User";
import firebase from "firebase";

export const loginUser = async (loginData: Auth): Promise<void> => {
  await firebase
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

export const createUser = async (loginData: Auth): Promise<void> => {
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

export const getLoggedUser = async (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) resolve(null);
      const user = {
        id: firebaseUser?.uid,
        email: firebaseUser?.email,
        token: firebaseUser?.getIdToken(),
      } as User;
      resolve(user);
    }, reject);
  });
};

export const logout = async (): Promise<void> => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Logged out!");
    })
    .catch((error) => {
      console.log(error.message);
      throw new Error(error.message);
    });
};
