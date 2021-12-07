import React, { useState } from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiClient from "../../utils/axios";
import { Link } from "react-router-dom";

import "./logincss.css";

const theme = createTheme();

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onUserIdChange = (e) => {
    setUserId(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      userId,
      password,
    };
    apiClient
      .post("/users/login", payload)
      .then((res) => {
        if (res.data.loginSuccess === true) {
          document.location.href = "/friends";
        }
      })
      .catch((err) => {
        alert("아이디나 비밀번호를 다시 확인하세요");
        setUserId("");
        setPassword("");
      });
  };

  return (
    <div className="login_box">
      <div className="login_logo">PRETALK</div>
      <div className="login_bar"></div>
      <form className="login_form" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          className="login_inpbox"
          onChange={onUserIdChange}
          value={userId}
          required
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="login_inpbox"
          onChange={onPasswordChange}
          value={password}
          required
        />
        <button className="login_button" type="submit">
          LOG IN
        </button>
      </form>
      <Link to="../register">
        <button className="login_button">SIGN UP</button>
      </Link>
    </div>
  );
};
