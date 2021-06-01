import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import { ref, Ref } from "vue";
import { Book } from "@/types/Book";
import useGetBooks from "@/use/useGetBooks";
import Home from "@/views/Home.vue";
import { generateBookList } from "../factories/books";

jest.mock("@/use/useGetBooks");
const useGetBooksMock = useGetBooks as jest.Mock<Ref<Array<Book>>>;

// Mocks logged in
jest.mock("@/use/useLoggedUser");
jest.mock("vue-router");

describe("Home component", () => {
  it("should render Home page", () => {
    const { getByText } = render(Home);

    expect(getByText(/home/i)).toBeInTheDocument();
  });

  it("should render a list of books", () => {
    const books = ref<Array<Book>>(generateBookList(1, 10));
    useGetBooksMock.mockReturnValue(books);
    const { getAllByTestId } = render(Home);

    expect(getAllByTestId("book").length).toBe(books.value.length);
  });
});
