import { Factory } from "fishery";
import { name, lorem, date, image, datatype } from "faker";
import { Book } from "@/types/Book";

interface BookParams {
  id?: string;
  imageUrl?: string;
  title?: string;
  author?: string;
  description?: string;
  publishDate?: Date;
}

const factory = Factory.define(() => ({
  id: datatype.uuid(),
  imageUrl: image.imageUrl(),
  title: name.title(),
  author: name.findName(),
  description: lorem.paragraph(),
  publishDate: date.past(),
}));

export const generateBook = (params?: BookParams): Book => {
  return <Book>factory.build(params);
};
