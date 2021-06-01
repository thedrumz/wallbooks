import { computed, ComputedRef, onMounted, ref } from "vue";
import { Book } from "@/types/Book";
import { useStore } from "vuex";
import { getBook, updateBook } from "@/services/booksRepository";

export const useGetBooks = (): ComputedRef<Array<Book>> => {
  const store = useStore();
  onMounted(() => {
    store.dispatch("getBooks");
  });
  const books = computed(() => store.state.books);
  return books;
};

export const useDeleteBook = () => {
  const store = useStore();
  return (bookId: string) => {
    store.dispatch("deleteBook", bookId);
  };
};

export const useCreateBook = () => {
  const store = useStore();
  return async (book: Book) => {
    await store.dispatch("createBook", book);
  };
};

export const useGetBook = (id: string) => {
  const book = ref<Book | null>(null);
  onMounted(async () => {
    book.value = await getBook(id);
  });
  return book;
};

export const useUpdateBook = () => {
  return async (book: Book) => {
    await updateBook(book);
  };
};
