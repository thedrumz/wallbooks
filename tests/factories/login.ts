import { Factory } from "fishery";
import { internet } from "faker";
import { User } from "@/types/User";

const factory = Factory.define(() => ({
  email: internet.email(),
  password: internet.password(),
}));

export const generateLogin = (): User => {
  return <User>factory.build();
};
