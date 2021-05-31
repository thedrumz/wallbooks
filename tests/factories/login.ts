import { Factory } from "fishery";
import { internet } from "faker";
import { Auth } from "@/types/User";

const factory = Factory.define(() => ({
  email: internet.email(),
  password: internet.password(),
}));

export const generateLogin = (): Auth => {
  return <Auth>factory.build();
};
