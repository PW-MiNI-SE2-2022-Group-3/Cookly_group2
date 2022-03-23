import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { InputAdornment } from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import logo from "../Images/logo.png";
import bg from "../Images/bg1.jpg";
import axios from "axios";
import MainWindow from "./MainWindow";

interface LoginProps {
  setIsLogged: any;
}

const LoginScreen: React.FC<LoginProps> = (props: LoginProps) => {
  // States for login
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  //handleLogin
  const handleLogin = (event: any) => {
    const data = {
      login: username,
      password: password,
    };

    //call api ---- TODO --- if false setLogin.. to false
    props.setIsLogged(true);
  };

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src={bg}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="brand"
          />
        </Grid>
        <Grid
          container
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }}
        >
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <Grid container justify="center">
              <img src={logo} width={300} alt="logo" />
            </Grid>
            <TextField
              margin="normal"
              data-testid="username-textfield"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              data-testid="password-textfield"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ height: 20 }} />
            <Button
              data-testid="login-button"
              placeholder="Log In"
              style={{
                backgroundColor: "#c4560c",
                color: "white",
                borderRadius: 0,
              }}
              variant="contained"
              onClick={handleLogin}
            >
              Log In
            </Button>
            {/* Also check for error while authorization */}
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginScreen;
