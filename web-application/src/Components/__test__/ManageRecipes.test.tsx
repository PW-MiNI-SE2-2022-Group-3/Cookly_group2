import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  render,
  screen,
  fireEvent,
  queryByTestId,
  cleanup,
} from "@testing-library/react";
import ManageRecipes from "../ManageRecipes";

it("renders correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ManageRecipes />, div);
});

it("renders buttons correctly", () => {
  const { getByTestId } = render(<ManageRecipes />);
  expect(getByTestId("filter-button")).toBeInTheDocument();
  expect(getByTestId("add-button")).toBeInTheDocument();
  expect(getByTestId("filter-button")).toHaveTextContent("Tag Filter");
  expect(getByTestId("add-button")).toHaveTextContent("Add Recipe");
});

it("renders input fields correctly", () => {
  const { getByTestId } = render(<ManageRecipes />);
  expect(getByTestId("search-textfield")).toBeInTheDocument();
});

it("matches snapshot", () => {
  const tree = render(<ManageRecipes />);
  expect(tree).toMatchSnapshot();
});
