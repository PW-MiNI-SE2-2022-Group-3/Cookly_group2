import { Box, Grid } from "@material-ui/core";
import { Button, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/Register.css";

interface AddIngredientsProps {
  setAddRegister: any;
}

const AddIngredient: React.FC<AddIngredientsProps> = (
  props: AddIngredientsProps
) => {
  const [name, setName] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //register users
  const Register = (event: any) => {
    event.preventDefault();
    const data = {
      name: name,
    };
    //axios goes here --
    setSubmitted(true);
    setError(false);
    setName("");
  };

  // Handling the form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (name === "") {
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
        Successfully registered a new ingredient!
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
        Please enter all required fields
      </Box>
    );
  };

  return (
    <div className="body">
      <div className="body-inner">
        <CloseIcon
          onClick={() => {
            props.setAddRegister(false);
          }}
          className="cls-bttn"
        ></CloseIcon>
        <Box className="heading">ADD NEW INGREDIENT</Box>
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
              props.setAddRegister(false);
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

export default AddIngredient;
