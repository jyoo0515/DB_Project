import React, { useState } from "react";
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
  &#Normal {
    grid-area: butn1;
    margin: 2vh 3vw 1vh 3vw;
    border-radius: 5em;
  }
  &#Rendevous {
    grid-aera: butn2;
    margin: 1vh 3vw 2vh 3vw;
    border-radius: 5em;
  }
`;

export const FootNav = () => {
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  const onClick = () => {
    console.log("Hi");
  };

  return (
    <>
      <Input value={msg} onChange={onChange} />
      <Btn id="Normal" onClick={onClick}>
        NORMAL
      </Btn>
      <Btn id="Rendevous" onClick={onClick}>
        RENDEVOUS
      </Btn>
    </>
  );
};
