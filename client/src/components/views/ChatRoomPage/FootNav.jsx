import React, { useState } from "react";
import { PopUp } from "./PopUp";
import styled from "styled-components";
import apiClient from "../../utils/axios";

export const FootNav = ({ roomId }) => {
  const [msg, setMsg] = useState("");
  const [rdv, setRdv] = useState(false);

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  const onClickNormal = () => {
    //  {
    //    "fromId": "myid",
    //    "toId": "amyid",
    //    "content": msg,
    //    "timeLimit": null
    //  }
    // apiClient.post("/chats", json).then((res) => console.log(res.data));
    console.log(msg);
    setMsg("");
  };

  const onClickRendezvous = () => {
    if (msg === "") return;

    setRdv(!rdv);
  };

  const setSubmit = (isSubmit) => {
    setRdv(!isSubmit);
    //  {
    //    "fromId": "myid",
    //    "toId": "amyid",
    //    "content": msg,
    //    "timeLimit": <timeLimit 단위가 뭐에요?>
    //  }
    // apiClient.post("/chats", json).then((res) => console.log(res.data));
    console.log(msg);
    setMsg("");
  };

  return (
    <>
      <Input value={msg} onChange={onChange} />
      <Btn id="normal" className={msg === "" ? "disable" : ""} onClick={onClickNormal}>
        NORMAL
      </Btn>
      <Btn id="rendezvous" className={msg === "" ? "disable" : ""} onClick={onClickRendezvous}>
        RENDEZVOUS
      </Btn>
      {rdv ? <PopUp setSubmit={setSubmit} /> : ""}
    </>
  );
};

const Input = styled.textarea`
  grid-area: text1;
  margin: 2vh 1vw;
  border-radius: 3em;
  padding: 1vh 2vw;
  &::-webkit-scrollbar {
    display: none;
  }
  &[type="text"]#Input {
  }
  &[type="button"] {
  }
  &[type="button"]:hover {
  }
  &[type="button"]:active {
  }
  &[type="button"]#NormalBtn {
    grid-area: butn1;
    margin: 2vh 3vw 1vh 3vw;
    border-radius: 5em;
  }
  &[type="button"]#RendevousBtn {
    grid-aera: butn2;
    margin: 1vh 3vw 2vh 3vw;
    border-radius: 5em;
  }
  font-size: 1.2rem;
`;

const Btn = styled.button`
  background-color: white;
  &:not(.disable):hover {
    background-color: black;
    color: white;
  }
  &:active {
    border-style: outset;
  }
  &#normal {
    grid-area: butn1;
    margin: 2vh 3vw 1vh 3vw;
    border-radius: 5em;
  }
  &#rendezvous {
    grid-aera: butn2;
    margin: 1vh 3vw 2vh 3vw;
    border-radius: 5em;
  }
  font-size: 1.5rem;
  font-weight: bold;
  &.disable {
    color: gray;
    border-color: gray;
  }
`;
