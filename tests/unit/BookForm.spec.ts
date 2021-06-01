import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import BookForm from "@/components/ui/objects/BookForm.vue";

describe("BookForm component", () => {
  it("should have a title field", () => {
    const { getByLabelText } = render(BookForm);

    expect(getByLabelText(/book title/i)).toBeInTheDocument();
  });

  it("should have an author field", () => {
    const { getByLabelText } = render(BookForm);

    expect(getByLabelText(/author/i)).toBeInTheDocument();
  });

  it("should have a image field", () => {
    const { getByLabelText } = render(BookForm);

    expect(getByLabelText(/book image/i)).toBeInTheDocument();
  });

  it("should have a publish date field", () => {
    const { getByLabelText } = render(BookForm);

    expect(getByLabelText(/publish date/i)).toBeInTheDocument();
  });

  it("should have a description field", () => {
    const { getByLabelText } = render(BookForm);

    expect(getByLabelText(/description/i)).toBeInTheDocument();
  });
});
