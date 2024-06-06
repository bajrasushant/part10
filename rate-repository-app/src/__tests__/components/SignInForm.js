import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SignInForm } from "../../components/SignIn";

describe("Signin", () => {
  describe("SigninForm", () => {
    it("calls submit function with correct arguments when form submitted", async () => {
      const onSubmitMock = jest.fn();
      const formikMock = {
        values: { username: "", password: "" },
        handleChange: jest.fn((field) => (value) => {
          formikMock.values[field] = value;
        }),
        handleSubmit: jest.fn(async () => {
          await onSubmitMock(formikMock.values);
        }),
        touched: { username: true, password: true },
        errors: {},
      };

      render(<SignInForm formik={formikMock} />);
      const usernameInput = screen.getByPlaceholderText("Username");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByText("Sign in");

      fireEvent.changeText(usernameInput, "testUser");
      fireEvent.changeText(passwordInput, "testPass");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          username: "testUser",
          password: "testPass",
        });
      });
    });
  });
});
