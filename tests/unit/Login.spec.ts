import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import Login from "@/views/Login.vue";

describe("Login component", () => {
  it("should render Login page", () => {
    const { getByText } = render(Login);
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it("Shound render email and password inputs", () => {
    const { getByLabelText } = render(Login);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("Should renders a Sign in button", () => {
    const { getByText } = render(Login);
    expect(getByText("Sign in")).toBeInTheDocument();
  });

  it("Should provide an error message on submit with empty email", async () => {
    const { getByText, getByTestId } = render(Login);

    await fireEvent.submit(getByTestId("form"));

    expect(getByText("Email is required")).toBeInTheDocument();
  });

  it("Should provide an error message on submit with invalid email", async () => {
    const { getByText, getByTestId, getByLabelText } = render(Login);

    const emailInput = getByLabelText(/email/i);
    userEvent.type(emailInput, "invalid.email@");

    await fireEvent.submit(getByTestId("form"));

    expect(getByText("Email is invalid")).toBeInTheDocument();
  });
});
