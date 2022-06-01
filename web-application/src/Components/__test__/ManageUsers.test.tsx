import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  render,
  screen,
  fireEvent,
  queryByTestId,
  cleanup,
} from "@testing-library/react";
import ManageUsers from "./../ManageUsers";

it("renders correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ManageUsers />, div);
});

it("renders buttons correctly", () => {
  const { getByTestId } = render(<ManageUsers />);
  expect(getByTestId("admins-button")).toBeInTheDocument();
  expect(getByTestId("appusers-button")).toBeInTheDocument();
  expect(getByTestId("add-button")).toBeInTheDocument();
  expect(getByTestId("admins-button")).toHaveTextContent("ADMINS");
  expect(getByTestId("appusers-button")).toHaveTextContent("APP USERS");
  expect(getByTestId("add-button")).toHaveTextContent("Add Admin");
});

it("matches snapshot", () => {
  const tree = render(<ManageUsers />);
  expect(tree).toMatchSnapshot();
});
