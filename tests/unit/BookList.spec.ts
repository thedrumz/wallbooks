import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import BookList from "@/components/ui/objects/BookList.vue";

describe("BookList component", () => {
  it("should render message when no books in list", () => {
    const { getByText } = render(BookList);

    expect(
      getByText(/there are no books, please create some/i)
    ).toBeInTheDocument();
  });
});
