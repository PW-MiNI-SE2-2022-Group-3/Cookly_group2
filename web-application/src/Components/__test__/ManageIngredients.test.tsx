import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  render,
  screen,
  fireEvent,
  queryByTestId,
  cleanup,
} from "@testing-library/react";
import { setupServer } from "msw/node";
import { MockedRequest, rest } from "msw";
import { ResponseComposition } from "msw/lib/types/response";
import ManageIngredients from "../ManageIngredients";

//region server mock
const server = setupServer(
  rest.get(
    "*/ingredients",
    (request: MockedRequest, response: ResponseComposition, ctx) => {
      return response(
        ctx.json([
          {
            id: "1",
            name: "Salmon",
          },
          {
            id: "2",
            name: "Tuna",
          },
          {
            id: "3",
            name: "Chicken",
          },
        ])
      );
    }
  )
);
//endregion

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup;
});
afterAll(() => server.close());

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

// describe("ingredients fetching tests", () => {
//   test("fetching should return a valid array of objects", async () => {
//     const employees = await getEmployees();

//     expect(employees).toBeInstanceOf(Array);
//     expect(employees).toHaveLength(3);
//   });
// });
