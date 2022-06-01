import React from "react";
import ReactDOM from "react-dom";
import {
  render,
  screen,
  fireEvent,
  queryByTestId,
  cleanup,
} from "@testing-library/react";
import LoginScreen from "./../Login";
import { isTSAnyKeyword } from "@babel/types";

afterEach(cleanup);

it("renders correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoginScreen setIsLogged={false} />, div);
});

it("renders logo correctly", () => {
  const { getByTestId } = render(<LoginScreen setIsLogged={false} />);
  expect(getByTestId("logo-img")).toHaveAttribute("src", "logo.png");
  expect(getByTestId("logo-img")).toHaveAttribute("alt", "logo");
  expect(getByTestId("logo-img")).toHaveAttribute("width", "300");
});

it("renders background correctly", () => {
  const { getByTestId } = render(<LoginScreen setIsLogged={false} />);
  expect(getByTestId("background-img")).toHaveAttribute("src", "bg1.jpg");
  expect(getByTestId("background-img")).toHaveAttribute("alt", "brand");
});

it("renders button correctly", () => {
  const { getByTestId } = render(<LoginScreen setIsLogged={false} />);
  expect(getByTestId("login-button")).toBeInTheDocument();
  expect(getByTestId("login-button")).toHaveTextContent("Log In");
});

it("renders input fields correctly", () => {
  const { getByTestId } = render(<LoginScreen setIsLogged={false} />);
  expect(getByTestId("username-textfield")).toBeInTheDocument();
  expect(getByTestId("password-textfield")).toBeInTheDocument();
});

it("matches snapshot", () => {
  const tree = render(<LoginScreen setIsLogged={false} />);
  expect(tree).toMatchSnapshot();
});
