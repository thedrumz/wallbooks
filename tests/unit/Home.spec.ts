import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import { computed, ComputedRef } from "vue";
import { Book } from "@/types/Book";
import { useGetBooks, useDeleteBook } from "@/use/useBooks";
import Home from "@/views/Home.vue";
import { generateBookList } from "../factories/books";
import userEvent from "@testing-library/user-event";

jest.mock("@/use/useBooks");
const useGetBooksMock = useGetBooks as jest.Mock<ComputedRef<Array<Book>>>;
const useDeleteBookMock = useDeleteBook as jest.Mock;

// Mocks logged in
jest.mock("@/use/useLoggedUser");
jest.mock("vue-router");

describe("Home component", () => {
  it("should render Home page", () => {
    const { getByText } = render(Home);

    expect(getByText(/home/i)).toBeInTheDocument();
  });

  it("should render a list of books", () => {
    const books = generateBookList(1, 10);
    useGetBooksMock.mockImplementation(() => {
      return computed(() => books);
    });
    const { getAllByTestId } = render(Home);

    expect(getAllByTestId("book").length).toBe(books.length);
  });

  it.only("should remove book when click on delete button", () => {
    const books = generateBookList(1, 10);
    const bookQuantity = books.length;
    useGetBooksMock.mockImplementation(() => {
      return computed(() => books);
    });
    useDeleteBookMock.mockImplementation(() => {
      return () => {
        books.shift();
      };
    });
    const { getAllByRole } = render(Home);

    const deleteBtns = getAllByRole("button", { name: /delete/i });
    userEvent.click(deleteBtns[0]);

    expect(books.length).toBe(bookQuantity - 1);
  });
});
