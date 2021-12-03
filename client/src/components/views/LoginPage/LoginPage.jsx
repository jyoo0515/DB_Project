import * as React from "react";
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
    const islogin = apiClient.post("/users/login", payload).then((res) => console.log(res.data));
    /*
    if (islogin.data.loginSuccess == false) {
      alert("아이디를 다시 확인해 보세요");
    } else {
      alert("로그인 성공!");
      document.location.href("/friendlist");
    }
    */
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className="login_box">
          <div className="login_logo">PRETALK</div>
          <div className="login_bar"></div>
          <form className="login_form" method="post" onSubmit={handleSubmit}>
            <input type="text" placeholder="ID" className="login_inpbox" id="userId" name="userId" required></input>
            <input
              type="password"
              placeholder="PASSWORD"
              className="login_inpbox"
              name="password"
              id="password"
              required
            ></input>
            <button className="login_button" type="submit">
              LOG IN
            </button>
          </form>
          <Link to="../register">
            <button className="login_button">SIGN UP</button>
          </Link>
        </div>
      </Container>
    </ThemeProvider>
  );
};
