import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  render,
  screen,
  fireEvent,
  queryByTestId,
  cleanup,
} from "@testing-library/react";
import ManageIngredients from "../ManageIngredients";

it("renders correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ManageIngredients />, div);
});

it("renders buttons correctly", () => {
  const { getByTestId } = render(<ManageIngredients />);
  expect(getByTestId("add-button")).toBeInTheDocument();
  expect(getByTestId("add-button")).toHaveTextContent("Add Ingredient");
});

it("renders input fields correctly", () => {
  const { getByTestId } = render(<ManageIngredients />);
  expect(getByTestId("search-textfield")).toBeInTheDocument();
});

it("matches snapshot", () => {
  const tree = render(<ManageIngredients />);
  expect(tree).toMatchSnapshot();
});
