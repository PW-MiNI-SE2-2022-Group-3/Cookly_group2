import { Box, Grid } from "@material-ui/core";
import { Button, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/Register.css";
import Ingredient from "./models/IngredientModel";
import { editIngredient } from "../mock_server/api";

interface EditIngredientsProps {
  setEditIngredient: any;
  editIngredientData:Ingredient
}

const EditIngredients: React.FC<EditIngredientsProps> = (props: EditIngredientsProps) => {
  const [name, setName] = useState("");
  const [IngredientId, setIngredientId] = useState(-1);
  const [ingredients, setIngredients] = useState({});

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
	  setName(props.editIngredientData.name);
	  setIngredientId(props.editIngredientData.id);
	  
  }, [])
  
  //register users
  const Register = (event: any) => {
    event.preventDefault();
    const data = {
	  id: IngredientId,
      name: name
    };
    //axios goes here --
	editIngredient(IngredientId, data);
    setSubmitted(true);
    setError(false);
    setName("");
  };

  // Handling the form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      name === "") {
      setError(true);
    } else {
      Register(event);
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
        Successfully edited an ingredient!
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
        Please enter name of ingredient
      </Box>
    );
  };

  return (
    <div className="body">
      <div className="body-inner">
        <CloseIcon
          onClick={() => {
            props.setEditIngredient(false);
          }}
          className="cls-bttn"
        ></CloseIcon>
        <Box className="heading">EDIT INGREDIENT</Box>
        {/* Calling to the methods */}
        <form className="body-form">
          {/* Labels and inputs for form data */}
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel>Name</InputLabel>
            <TextField
              required
              fullWidth
              variant="standard"
              value={name}
              helperText="Please enter name of the ingredient"
              onChange={(event) => {
                setName(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            sx={{ borderRadius: 0 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            color="error"
            sx={{ borderRadius: 0, float: "right" }}
            onClick={() => {
              props.setEditIngredient(false);
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

export default EditIngredients;