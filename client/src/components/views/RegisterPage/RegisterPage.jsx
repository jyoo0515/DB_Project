import * as React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { useRef } from "react";
import "./registcss.css";
import apiClient from "../../utils/axios";

export const RegisterPage = (history) => {
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
    if (Id_now.current.readOnly === false) {
      alert("아이디 중복확인 버튼을 눌러주세요!");
    } else if (state.confirmPassword !== state.password) {
      alert("비밀번호를 다시 확인해주세요");
    } else {
      apiClient.post("/users/register", payload).then((res) => console.log(res.data));
      alert("회원가입 완료!");
      document.location.href = "/login";
    }
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
    apiClient.get("/users/unique/" + ID_input).then(function (res) {
      if (!regexp.test(ID_input)) {
        alert("아이디 형식이 올바르지 않습니다!\n20자 이내 특수문자 금지");
      } else if (res.data.unique === false) {
        console.log(res.data);
        alert("이미 사용중인 아이디 입니다!");
      } else {
        console.log(res);
        alert("사용 가능한 아이디 입니다!");
        Id_now.current.readOnly = "true";
      }
    });
  };

  return (
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
          <option className="login_inpbox" value="일반">
            일반
          </option>
          <option className="login_inpbox" value="학생">
            학생
          </option>
          <option className="login_inpbox" value="강사">
            강사
          </option>
          <option className="login_inpbox" value="기업">
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
  );
};
