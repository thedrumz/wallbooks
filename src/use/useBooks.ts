import { computed, ComputedRef, onMounted } from "vue";
import { Book } from "@/types/Book";
import { useStore } from "vuex";

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
