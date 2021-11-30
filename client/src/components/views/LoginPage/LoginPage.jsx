import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiClient from "../../utils/axios";
import { Link } from "react-router-dom";

import "./logincss.css";

const theme = createTheme();

export const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const payload = {
      userId: data.get("userId"),
      password: data.get("password"),
    };
    apiClient.post("/users/login", payload).then((res) => console.log(res.data));
  };

  const handlelink = (event) => {};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="ID"
              name="userId"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box> */}
        <div class="login_box">
          <div class="login_logo">PRETALK</div>
          <div class="login_bar"></div>
          <form class="login_form" method="post" onSubmit={handleSubmit}>
            <input type="text" placeholder="ID" class="login_inpbox" id="userId" name="userId" required></input>
            <input
              type="password"
              placeholder="PASSWORD"
              class="login_inpbox"
              name="password"
              id="password"
              required
            ></input>
            <button class="login_button" type="submit">
              LOG IN
            </button>
          </form>
          <Link to="../register">
            <button class="login_button">SIGN UP</button>
          </Link>
        </div>
      </Container>
    </ThemeProvider>
  );
};
