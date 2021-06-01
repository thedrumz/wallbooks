import { deleteBook, getBooks } from "@/services/booksRepository";
import { Book } from "@/types/Book";
import { createStore } from "vuex";

interface State {
  books: Array<Book> | null;
}

const state: State = {
  books: null,
};

export default createStore({
  state,
  getters: {},
  mutations: {
    SET_BOOKS(state, books: Array<Book>) {
      state.books = books;
    },
    DELETE_BOOK(state, bookId: string) {
      console.log(
        "siii",
        state.books?.filter((book) => book.id !== bookId)
      );
      state.books = state.books?.filter((book) => book.id !== bookId) || null;
    },
  },
  actions: {
    async getBooks({ commit }) {
      const books = await getBooks();
      commit("SET_BOOKS", books);
    },
    async deleteBook({ commit }, bookId: string) {
      await deleteBook(bookId);
      commit("DELETE_BOOK", bookId);
    },
  },
  modules: {},
});
