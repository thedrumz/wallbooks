import { deleteBook, getBooks, createBook } from "@/services/booksRepository";
import { Book } from "@/types/Book";
import { createStore } from "vuex";

interface State {
  books: Array<Book>;
}

const state: State = {
  books: [],
};

export default createStore({
  state,
  getters: {},
  mutations: {
    SET_BOOKS(state, books: Array<Book>) {
      state.books = books;
    },
    DELETE_BOOK(state, bookId: string) {
      state.books = state.books?.filter((book) => book.id !== bookId) || null;
    },
    CREATE_BOOK(state, book: Book) {
      state.books = [...state.books, book];
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
    async createBook({ commit }, book: Book) {
      const createdBook = await createBook(book);
      commit("CREATE_BOOK", createdBook);
    },
  },
  modules: {},
});
