//Estimated time - 10hr +
import React from "react";
import { useState } from "react";
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import LoginScreen from "./Components/Login";
import MainWindow from "./Components/MainWindow";
import ManageUsers from "./Components/ManageUsers";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLogged ? (
              <MainWindow setIsLogged={setIsLogged} />
            ) : (
              <LoginScreen setIsLogged={setIsLogged} />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
