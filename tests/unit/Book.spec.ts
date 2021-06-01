import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import Book from "@/components/ui/molecules/Book.vue";
import { generateBook } from "../factories/books";
import { dateToString } from "@/utils/dates";
import { truncate } from "@/utils/text";

jest.mock("@/utils/text");
const mockedTruncate = truncate as jest.Mock;

// Mock useBooks
jest.mock("@/use/useBooks");

describe("Book component", () => {
  it("should render an image", () => {
    const book = generateBook();

    const { getByRole } = render(Book, {
      props: book,
    });

    const image = getByRole("img");
    expect(image).toHaveAttribute("src", book.imageUrl);
    expect(image).toHaveAttribute("alt", "book image");
  });

  it("should render a title", () => {
    const book = generateBook();
    const { getByRole } = render(Book, {
      props: book,
    });

    expect(
      getByRole("heading", { level: 2, name: book.title })
    ).toBeInTheDocument();
  });

  it("should render an author", () => {
    const book = generateBook();

    const { getByRole } = render(Book, {
      props: book,
    });

    expect(
      getByRole("heading", { level: 3, name: book.author })
    ).toBeInTheDocument();
  });

  it("should render a description", () => {
    const book = generateBook();
    mockedTruncate.mockReturnValue(book.description);

    const { getByText } = render(Book, {
      props: book,
    });

    expect(getByText(book.description)).toBeInTheDocument();
  });

  it("should render a publish date", () => {
    const book = generateBook();

    const { getByText } = render(Book, {
      props: book,
    });

    expect(getByText(dateToString(book.publishDate))).toBeInTheDocument();
  });

  it("should render an edit button", () => {
    const book = generateBook();

    const { getByText } = render(Book, {
      props: book,
    });

    expect(getByText("Edit book")).toBeInTheDocument();
  });

  it("should render a delete button", () => {
    const book = generateBook();

    const { getByText } = render(Book, {
      props: book,
    });

    expect(getByText("Delete")).toBeInTheDocument();
  });
});
