import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/ui/molecules/LoginForm.vue";
import { generateLogin } from "../factories/login";
import { loginUser } from "@/services/userRepository";

jest.mock("@/services/userRepository");
const mockedLoginUser = loginUser as jest.Mock<Promise<void>>;

describe("LoginForm component", () => {
  it("should render Login page", () => {
    const { getByText } = render(LoginForm);
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it("Shound render email and password inputs", () => {
    const { getByLabelText } = render(LoginForm);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("Should renders a Sign in button", () => {
    const { getByText } = render(LoginForm);
    expect(getByText("Sign in")).toBeInTheDocument();
  });

  it("Should provide an error message on submit with empty email", async () => {
    const { getByText, getByTestId } = render(LoginForm);

    await fireEvent.submit(getByTestId("form"));

    expect(getByText("Email is required")).toBeInTheDocument();
  });

  it("Should provide an error message on submit with invalid email", async () => {
    const { getByText, getByTestId, getByLabelText } = render(LoginForm);
    const emailInput = getByLabelText(/email/i);

    userEvent.type(emailInput, "invalid.email@");
    await fireEvent.submit(getByTestId("form"));

    expect(getByText("Email is invalid")).toBeInTheDocument();
  });

  it("Should provide a success message on login", async () => {
    const { getByText, getByTestId, getByLabelText } = render(LoginForm);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const loginData = generateLogin();
    await mockedLoginUser.mockImplementation(() => {
      return new Promise((res) => res());
    });

    userEvent.type(emailInput, loginData.email);
    userEvent.type(passwordInput, loginData.password);
    await fireEvent.submit(getByTestId("form"));

    expect(getByText(/login success/i)).toBeInTheDocument();
  });

  it("Should provide an error message when login fails", async () => {
    const { getByText, getByTestId, getByLabelText } = render(LoginForm);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const loginData = generateLogin();
    await mockedLoginUser.mockImplementation(() => {
      throw new Error("error on login");
    });

    userEvent.type(emailInput, loginData.email);
    userEvent.type(passwordInput, loginData.password);
    await fireEvent.submit(getByTestId("form"));

    expect(getByText(/error on login/i)).toBeInTheDocument();
  });

  it("Should renders a Sign up button", () => {
    const { getByText } = render(LoginForm);
    expect(getByText("Sign up")).toBeInTheDocument();
  });
});
