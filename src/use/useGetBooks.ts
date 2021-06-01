import { onMounted, Ref, ref } from "vue";
import { Book } from "@/types/Book";
import { getBooks } from "@/services/booksRepository";

export default (): Ref<Array<Book>> => {
  const books = ref<Array<Book>>([]);
  onMounted(async () => {
    books.value = await getBooks();
  });
  return books;
};
