import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  render,
  screen,
  fireEvent,
  queryByTestId,
  cleanup,
} from "@testing-library/react";
import MainWindow from "./../MainWindow";

afterEach(cleanup);

it("renders correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MainWindow setIsLogged={true} />, div);
});

it("renders buttons correctly", () => {
  const { getByTestId } = render(<MainWindow setIsLogged={true} />);
  expect(getByTestId("users-button")).toBeInTheDocument();
  expect(getByTestId("recipes-button")).toBeInTheDocument();
  expect(getByTestId("ingredients-button")).toBeInTheDocument();
  expect(getByTestId("logout-button")).toBeInTheDocument();
  expect(getByTestId("users-button")).toHaveTextContent("USERS");
  expect(getByTestId("recipes-button")).toHaveTextContent("RECIPES");
  expect(getByTestId("ingredients-button")).toHaveTextContent("INGREDIENTS");
  expect(getByTestId("logout-button")).toHaveTextContent("LOG OUT");
});

it("matches snapshot", () => {
  const tree = render(<MainWindow setIsLogged={true} />);
  expect(tree).toMatchSnapshot();
});
