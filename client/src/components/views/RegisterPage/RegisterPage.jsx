import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { useRef } from "react";
import "./registcss.css";
import apiClient from "../../utils/axios";

const theme = createTheme();

export const RegisterPage = () => {
  let state = {
    password: "",
    confirmPassword: "",
  };

  const Id_now = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      userId: data.get("userId"),
      password: data.get("password"),
      name: data.get("name"),
      role: data.get("role"),
      location: "공학관",
    };
    apiClient.post("/users/register", payload).then((res) => console.log(res.data));
  };

  const chk_pw = (event) => {
    event.preventDefault();
    const data = event.target.value;
    state.password = data;
    PWme();
  };

  const chk_pw_cf = (event) => {
    event.preventDefault();
    const data = event.target.value;
    state.confirmPassword = data;
    PWme();
  };

  function PWme() {
    let element = "";
    if (state.confirmPassword === state.password && state.confirmPassword === "") {
      element = <div id="PWmessage">Please Input PW</div>;
    } else if (state.confirmPassword === state.password) {
      element = <div id="PWmessage">Valid!</div>;
    } else {
      element = <div id="PWmessage">Invalid!</div>;
    }
    ReactDOM.render(element, document.getElementById("PWmessage"));
  }

  const ID_inval = (event) => {
    event.preventDefault();
    const ID_input = Id_now.current.value;
    const regexp = /^[A-Za-z0-9]{1,20}$/;
    const isdup = apiClient.get("/users/unique/" + ID_input);
    if (!regexp.test(ID_input)) {
      alert("아이디 형식이 올바르지 않습니다!\n20자 이내 특수문자 금지");
    } else if (isdup.data === false) {
      alert("이미 사용중인 아이디 입니다!");
    } else {
      alert("사용 가능한 아이디 입니다!");
      Id_now.current.readOnly = "true";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className="login_box">
          <div className="login_logo">SIGN UP</div>
          <div className="login_bar"></div>
          <form className="login_form" method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="ID"
              className="login_inpbox"
              id="userId"
              name="userId"
              ref={Id_now}
              required
            ></input>
            <button className="login_button" onClick={ID_inval}>
              ID 중복확인
            </button>
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
              onChange={chk_pw_cf}
              required
            ></input>
            <div id="PWmessage" className="login_txt">
              Please Input PW
            </div>
            <input type="text" placeholder="이름" className="login_inpbox" id="name" name="name" required></input>
            <select className="login_inpbox" name="role" id="role">
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
