import React, { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ManageAdmins from "./ManageAdmins";
import ManageRecipes from "./ManageRecipes";
import ManageIngredients from "./ManageIngredients";
import LoginScreen from "./Login";

interface MainWindowProps {
  setIsLogged: any;
}

const MainWindow: React.FC<MainWindowProps> = (props: MainWindowProps) => {
  const [clickedAdmin, setClickedAdmin] = useState(true);
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
                key="admins"
                sx={{
                  background: clickedAdmin ? "brown" : "#c4560c",
                  my: 2,
                  color: "white",
                  display: "block",
                  borderRadius: 0,
                }}
                onClick={() => {
                  setClickedAdmin(true);
                  setclickedRecipe(false);
                  setClickedIngredient(false);
                }}
              >
                ADMINS
              </Button>
              <Button
                key="recipes"
                sx={{
                  background: clickedRecipe ? "brown" : "#c4560c",
                  my: 2,
                  color: "white",
                  display: "block",
                  borderRadius: 0,
                }}
                onClick={() => {
                  setclickedRecipe(true);
                  setClickedAdmin(false);
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
                }}
                onClick={() => {
                  setClickedIngredient(true);
                  setclickedRecipe(false);
                  setClickedAdmin(false);
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
        {clickedAdmin ? <ManageAdmins /> : null}
        {clickedRecipe ? <ManageRecipes /> : null}
        {clickedIngredient ? <ManageIngredients /> : null}
      </Container>
    </>
  );
};

export default MainWindow;
