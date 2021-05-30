import { ILogin } from "@/types/Login";
import firebase from "firebase";

export const loginUser = async (loginData: ILogin) => {
  console.log(loginData);
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
