import { Box, Grid } from "@material-ui/core";
import { Button, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/Register.css";

interface EditRecipeProps {
  setEditUser: any;
  editUserData: any;
}

const EditRecipe: React.FC<EditRecipeProps> = (props: EditRecipeProps) => {
  // States for registration
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [tags, setTags] = useState({
    vegetarian: false,
    "gluten free": false,
    "low calorie": false,
    "no lactose": false,
  });
  const [ingredients, setIngredients] = useState({});

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //register users
  const Edit = (event: any) => {
    event.preventDefault();
    const data = {
      name: name,
      instructions: instructions,
      tags: tags,
      ingredients: ingredients,
    };
    //axios goes here --
    setSubmitted(true);
    setError(false);
    setName("");
    setInstructions("");
  };

  // Handling the form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      name === "" ||
      instructions === "" ||
      Object.keys(ingredients).length === 0
    ) {
      setError(true);
    } else {
      Edit(event);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <Box
        sx={{
          display: submitted ? "" : "none",
          textAlign: "center",
          color: "green",
          width: "91%",
          margin: "auto",
        }}
      >
        Successfully registered!
      </Box>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <Box
        sx={{
          display: error ? "" : "none",
          textAlign: "center",
          color: "red",
          width: "91%",
          margin: "auto",
        }}
      >
        Please enter all the fields
      </Box>
    );
  };

  return (
    <div className="body">
      <div className="body-inner">
        <CloseIcon
          onClick={() => {
            props.setEditUser(false);
          }}
          className="cls-bttn"
        ></CloseIcon>
        <Box className="heading">EDIT RECIPE DETAILS</Box>
        {/* Calling to the methods */}
        <form className="body-form">
          {/* Labels and inputs for form data */}
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel>Name</InputLabel>
            <TextField
              required
              fullWidth
              variant="standard"
              value={name == "" ? props.editUserData.name : name}
              helperText="Please enter name of the recipe"
              onChange={(event) => {
                setName(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel>Instructions</InputLabel>
            <TextField
              required
              fullWidth
              value={
                instructions == ""
                  ? props.editUserData.instructions
                  : instructions
              }
              variant="standard"
              helperText="Please enter instructions"
              onChange={(event) => {
                setInstructions(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>
          {/* <div style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel>Login</InputLabel>
            <TextField
              required
              fullWidth
              value={username == "" ? props.editUserData.login : username}
              variant="standard"
              helperText="Please enter your username"
              onChange={(event) => {
                setUsername(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>*/}
          <Button
            type="submit"
            color="primary"
            sx={{ borderRadius: 0 }}
            onClick={handleSubmit}
          >
            Enter
          </Button>
          <Button
            type="reset"
            color="error"
            sx={{ borderRadius: 0, float: "right" }}
            onClick={() => {
              props.setEditUser(false);
            }}
          >
            Cancel
          </Button>
        </form>
        <div>
          {errorMessage()}
          {successMessage()}
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
