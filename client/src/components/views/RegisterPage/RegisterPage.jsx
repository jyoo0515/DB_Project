import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";

const theme = createTheme();

export const RegisterPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // // eslint-disable-next-line no-console
    const payload = {
      userId: data.get("userId"),
      password: data.get("password"),
      name: data.get("name"),
      role: data.get("role"),
    };
    // console.log(payload);
    axios
      .post("http://localhost:5000/api/users/register", payload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const chk_pw = (event) => {};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className="login_box">
          <div className="login_logo">SIGN UP</div>
          <div className="login_bar"></div>
          <form className="login_form" method="post" onSubmit={handleSubmit}>
            <input type="text" placeholder="ID" className="login_inpbox" id="userId" name="userId" required></input>
            <input
              type="password"
              placeholder="PASSWORD"
              className="login_inpbox"
              name="password"
              id="password"
              onChange={chk_pw}
              required
            ></input>
            <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              className="login_inpbox"
              name="password_chk"
              id="password_chk"
              onChange={chk_pw}
              required
            ></input>
            <div className="login_txt">Please Input PW</div>
            <select className="login_inpbox">
              <option className="login_inpbox" value="">
                일반
              </option>
              <option className="login_inpbox" value="1">
                학생
              </option>
              <option className="login_inpbox" value="2">
                강사
              </option>
              <option className="login_inpbox" value="3">
                기업
              </option>
            </select>
            <button className="login_button" type="submit">
              CREATE
            </button>
          </form>
          <Link to="../login">
            <button className="login_button">SIGN IN</button>
          </Link>
        </div>
      </Container>
    </ThemeProvider>
  );
};
