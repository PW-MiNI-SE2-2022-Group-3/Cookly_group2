import React from "react";
import {
  render,
  screen,
  fireEvent,
  queryByTestId,
} from "@testing-library/react";
import LoginScreen from "./Login";

it("renders correctly", () => {
  const { queryByTestId } = render(<LoginScreen setisLogged={false} />);

  expect(queryByTestId("username-textfield")).toBeTruthy();
  expect(queryByTestId("password-textfield")).toBeTruthy();
  expect(queryByTestId("login-button")).toBeTruthy();
});
