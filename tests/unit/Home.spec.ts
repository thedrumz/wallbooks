import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import { computed, ComputedRef } from "vue";
import { Book } from "@/types/Book";
import { useGetBooks } from "@/use/useBooks";
import Home from "@/views/Home.vue";
import { generateBookList } from "../factories/books";

jest.mock("@/use/useBooks");
const useGetBooksMock = useGetBooks as jest.Mock<ComputedRef<Array<Book>>>;

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
});
