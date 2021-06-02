import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import BookList from "@/components/ui/objects/BookList.vue";
import { generateBookList } from "../factories/books";
import { useGetBooks, useDeleteBook } from "@/use/useBooks";
import { computed, ComputedRef } from "@vue/runtime-core";
import { Book } from "@/types/Book";
import userEvent from "@testing-library/user-event";

jest.mock("@/use/useBooks");
const useGetBooksMock = useGetBooks as jest.Mock<ComputedRef<Array<Book>>>;
const useDeleteBookMock = useDeleteBook as jest.Mock;

describe("BookList component", () => {
  it("should render message when no books in list", () => {
    const { getByText } = render(BookList);

    expect(
      getByText(/there are no books, please create some/i)
    ).toBeInTheDocument();
  });

  it("should render a list of books", () => {
    const books = generateBookList(1, 10);
    useGetBooksMock.mockImplementation(() => {
      return computed(() => books);
    });

    const { getAllByTestId } = render(BookList);

    expect(getAllByTestId("book").length).toBe(books.length);
  });

  it("should remove book when click on delete button", () => {
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
    const { getAllByRole } = render(BookList);

    const deleteBtns = getAllByRole("button", { name: /delete/i });
    userEvent.click(deleteBtns[0]);

    expect(books.length).toBe(bookQuantity - 1);
  });
});
