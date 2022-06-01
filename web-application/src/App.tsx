//Estimated time - 10hr +
import React from "react";
import { useState } from "react";
import LoginScreen from "./Components/Login";
import MainWindow from "./Components/MainWindow";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      {isLogged ? (
        <MainWindow setIsLogged={setIsLogged} />
      ) : (
        <LoginScreen setIsLogged={setIsLogged} />
      )}
    </>
  );
}

export default App;
