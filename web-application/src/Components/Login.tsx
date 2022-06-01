import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";

import logo from "../Images/logo.png";
import bg from "../Images/bg1.jpg";

import axios from "axios";

var forge = require("node-forge");

interface LoginProps {
  setIsLogged: any;
}

const LoginScreen: React.FC<LoginProps> = (props: LoginProps) => {
  // States for login
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  //handleLogin
  const handleLogin = async (event: any) => {
    let md = forge.md.sha256.create();
    md.update(password);
    let secret = md.digest().toHex();

    axios
      .post(
        "http://localhost:3001/login",
        { username: username, password: secret },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "---",
          },
        }
      )
      .then((response) => {
        props.setIsLogged(true);
      })
      .catch((err) => {
        props.setIsLogged(false);
        alert(err);
      });
  };

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            data-testid="background-img"
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
              <img data-testid="logo-img" src={logo} width={300} alt="logo" />
            </Grid>
            <TextField
              margin="normal"
              value={username}
              data-testid="username-textfield"
              id="username"
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
              value={password}
              data-testid="password-textfield"
              id="password"
              placeholder="Password"
              type="password"
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
              id="login-button"
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
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginScreen;
