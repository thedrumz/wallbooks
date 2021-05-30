import { Factory } from "fishery";
import { internet } from "faker";
import { ILogin } from "@/types/Login";

const factory = Factory.define(() => ({
  email: internet.email(),
  password: internet.password(),
}));

export const generateLogin = (): ILogin => {
  return <ILogin>factory.build();
};
