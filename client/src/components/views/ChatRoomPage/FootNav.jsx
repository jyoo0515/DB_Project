import React, { useState } from "react";
import { PopUp } from "./PopUp";
import styled from "styled-components";

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
  &:hover {
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
  font-weight: bold;
`;

export const FootNav = () => {
  const [msg, setMsg] = useState("");
  const [rdv, setRdv] = useState("");

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  const onClickNormal = () => {
    console.log("submit");
  };

  const onClickRendezvous = () => {
    setRdv(!rdv);
  };

  const setSubmit = (isSubmit) => {
    setRdv(isSubmit);
  };

  return (
    <>
      <Input value={msg} onChange={onChange} />
      <Btn id="normal" onClick={onClickNormal}>
        NORMAL
      </Btn>
      <Btn id="rendezvous" onClick={onClickRendezvous}>
        RENDEZVOUS
      </Btn>
      {rdv ? <PopUp setSubmit={setSubmit} /> : ""}
    </>
  );
};
