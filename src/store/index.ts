import { deleteBook, getBooks, createBook } from "@/services/booksRepository";
import { Book } from "@/types/Book";
import { createStore } from "vuex";

interface Paginate {
  page: number;
  perPage: number;
}

interface State {
  books: Array<Book>;
  paginate: Paginate;
}

const state: State = {
  books: [],
  paginate: { page: 1, perPage: 2 },
};

export default createStore({
  state,
  getters: {
    getBooksCount: (state) => () => state.books.length,
    getBooks: (state) => () => {
      const start = (state.paginate.page - 1) * state.paginate.perPage;
      const end = state.paginate.page * state.paginate.perPage;
      return state.books.slice(start, end);
    },
    getPagesLength: (state) => () => {
      const pages = state.books.length / state.paginate.perPage;
      const intPart = Math.trunc(pages);
      const floatPart = pages % 1;
      return floatPart ? intPart + 1 : intPart;
    },
  },
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
    CHANGE_PAGE(state, page) {
      state.paginate = { ...state.paginate, page };
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
