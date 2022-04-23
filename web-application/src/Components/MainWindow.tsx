import React, { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ManageUsers from "./ManageUsers";
import ManageRecipes from "./ManageRecipes";
import ManageIngredients from "./ManageIngredients";
import LoginScreen from "./Login";

interface MainWindowProps {
  setIsLogged: any;
}

const MainWindow: React.FC<MainWindowProps> = (props: MainWindowProps) => {
  const [clickedUser, setClickedUser] = useState(true);
  const [clickedRecipe, setclickedRecipe] = useState(false);
  const [clickedIngredient, setClickedIngredient] = useState(false);
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#c4560c" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              noWrap
              component="div"
              sx={{ mr: 4, display: { xs: "none", md: "flex" }, fontSize: 28 }}
            >
              COOKLY
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="users"
                sx={{
                  background: clickedUser ? "brown" : "#c4560c",
                  my: 2,
                  color: "white",
                  display: "block",
                  borderRadius: 0,
                  "&:hover": { backgroundColor: "#d97938" },
                }}
                onClick={() => {
                  setClickedUser(true);
                  setclickedRecipe(false);
                  setClickedIngredient(false);
                }}
              >
                USERS
              </Button>
              <Button
                key="recipes"
                sx={{
                  background: clickedRecipe ? "brown" : "#c4560c",
                  my: 2,
                  color: "white",
                  display: "block",
                  borderRadius: 0,
                  "&:hover": { backgroundColor: "#d97938" },
                }}
                onClick={() => {
                  setclickedRecipe(true);
                  setClickedUser(false);
                  setClickedIngredient(false);
                }}
              >
                RECIPES
              </Button>
              <Button
                key="ingredients"
                sx={{
                  background: clickedIngredient ? "brown" : "#c4560c",
                  my: 2,
                  color: "white",
                  display: "block",
                  borderRadius: 0,
                  "&:hover": { backgroundColor: "#d97938" },
                }}
                onClick={() => {
                  setClickedIngredient(true);
                  setclickedRecipe(false);
                  setClickedUser(false);
                }}
              >
                INGREDIENTS
              </Button>
            </Box>
            <Button
              key="logOut"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                alignSelf: "right",
                borderRadius: 0,
                "&:hover": { backgroundColor: "#d97938" },
              }}
              onClick={() => {
                props.setIsLogged(false);
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                LOG OUT
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        {clickedUser ? <ManageUsers /> : null}
        {clickedRecipe ? <ManageRecipes /> : null}
        {clickedIngredient ? <ManageIngredients /> : null}
      </Container>
    </>
  );
};

export default MainWindow;
