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

interface MainWindowProps {
  setIsLogged: any;
}

const MainWindow: React.FC<MainWindowProps> = (props: MainWindowProps) => {
  const [clickedUser, setClickedUser] = useState(true);
  const [clickedRecipe, setclickedRecipe] = useState(false);
  const [clickedIngredient, setClickedIngredient] = useState(false);
  return (
    <div>
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
                data-testid="users-button"
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
                data-testid="recipes-button"
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
                data-testid="ingredients-button"
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
              data-testid="logout-button"
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
              LOG OUT
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        {clickedUser ? <ManageUsers /> : null}
        {clickedRecipe ? <ManageRecipes /> : null}
        {clickedIngredient ? <ManageIngredients /> : null}
      </Container>
    </div>
  );
};

export default MainWindow;
