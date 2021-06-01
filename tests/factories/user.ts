import { Factory } from "fishery";
import { internet, datatype } from "faker";
import { User } from "@/types/User";

const factory = Factory.define(() => ({
  id: datatype.uuid,
  password: internet.password(),
}));

export const generateUser = (): User => {
  return <User>factory.build();
};
