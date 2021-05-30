import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import Signup from "@/views/Signup.vue";
import { generateLogin } from "../factories/login";
import { createUser } from "@/services/userRepository";

jest.mock("@/services/userRepository");
const mockedLoginUser = createUser as jest.Mock<Promise<void>>;

describe("Signup component", () => {
  it("should render Signup page", () => {
    const { getByText } = render(Signup);
    expect(getByText(/create account/i)).toBeInTheDocument();
  });

  it("Shound render email, password and repeat password inputs", () => {
    const { getByLabelText } = render(Signup);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/^password/i)).toBeInTheDocument();
    expect(getByLabelText(/repeat password/i)).toBeInTheDocument();
  });

  it("Should renders a Sign up button", () => {
    const { getByText } = render(Signup);
    expect(getByText(/sign up/i)).toBeInTheDocument();
  });

  it("Should renders a Login button", () => {
    const { getByText } = render(Signup);
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it("Should provide an error message when passwords doesn't match", async () => {
    const { getAllByText, getByTestId, getByLabelText } = render(Signup);
    const passwordInput = getByLabelText(/^password/i);
    const rePasswordInput = getByLabelText(/repeat password/i);
    const { password } = generateLogin();
    const { password: password2 } = generateLogin();

    userEvent.type(passwordInput, password);
    userEvent.type(rePasswordInput, password2);
    await fireEvent.submit(getByTestId("form"));

    expect(getAllByText(/passwords doesn't match/i).length).toBe(2);
  });

  it("Should provide a success message on signup", async () => {
    const { getByText, getByTestId, getByLabelText } = render(Signup);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/^password/i);
    const rePasswordInput = getByLabelText(/repeat password/i);
    const loginData = generateLogin();
    await mockedLoginUser.mockImplementation(() => {
      return new Promise((res) => res());
    });

    userEvent.type(emailInput, loginData.email);
    userEvent.type(passwordInput, loginData.password);
    userEvent.type(rePasswordInput, loginData.password);
    await fireEvent.submit(getByTestId("form"));

    expect(getByText(/welcome to wallbooks/i)).toBeInTheDocument();
  });

  it("Should provide a success message on signup", async () => {
    const { getByText, getByTestId, getByLabelText } = render(Signup);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/^password/i);
    const rePasswordInput = getByLabelText(/repeat password/i);
    const loginData = generateLogin();
    await mockedLoginUser.mockImplementation(() => {
      throw new Error("error on signup");
    });

    userEvent.type(emailInput, loginData.email);
    userEvent.type(passwordInput, loginData.password);
    userEvent.type(rePasswordInput, loginData.password);
    await fireEvent.submit(getByTestId("form"));

    expect(getByText(/error on signup/i)).toBeInTheDocument();
  });
});
