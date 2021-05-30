import { User } from "@/types/User";
import firebase from "firebase";

export const loginUser = async (loginData: User) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(loginData.email, loginData.password)
    .then((e) => {
      console.log(e);
    })
    .catch((error) => {
      console.log(error.message);
      throw new Error(error.message);
    });
};

export const createUser = async (loginData: User) => {
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
