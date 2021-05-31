import "@testing-library/jest-dom";
import { render, waitForElementToBeRemoved } from "@testing-library/vue";
import Notification from "@/components/ui/atoms/Notification.vue";

describe("LoginForm component", () => {
  it("should render Notification with message", () => {
    const message = "The Rain Song";

    const { getByText } = render(Notification, {
      props: {
        message,
      },
    });

    expect(getByText(message)).toBeInTheDocument();
  });

  it("Shound disapear after a given time", async () => {
    const message = "Houses of the Holy";
    const timer = 10;
    const { getByText, queryByText } = render(Notification, {
      props: {
        message,
        timer,
      },
    });

    expect(getByText(message)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByText(message));
  });
});
