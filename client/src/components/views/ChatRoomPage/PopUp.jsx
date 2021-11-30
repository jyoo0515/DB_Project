import React, { useState } from "react";
import styled from "styled-components";

const Back = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: gray;
  opacity: 50%;
  margin: 0 auto;
`;

const Main = styled.div`
  position: absolute;
  top: 35vh;
  left: 35vw;
  width: 30vw;
  height: 30vh;
  z-index: 2;
  background-color: white;
  margin: 0 auto;
  border: 1px solid white;
  border-radius: 2em;
`;

const MinBtn = styled.button`
  position: relative;
  top: 4vh;
  width: 5vw;
  height: 10vh;
  margin: 0 1.25vw;
  border: 3px solid darkgray;
  border-radius: 2em;
  background-color: white;
  font-size: 1vw;
  overflow-wrap: break-word;
  &:hover {
    border-color: black;
    background-color: black;
    color: white;
  }
  &#submit {
    margin: 2.5vh 2.5vw 3.5vh 2.5vw;
    width: 25vw;
    font-size: 2.5vw;
  }
  &.click {
    border-color: black;
    background-color: black;
    color: white;
  }
`;

const MinuteInput = styled.input`
  position: absolute;
  z-index: 3;
  top: -7vh;
  left: 10vw;
  width: 10vw;
  height: 5vh;
  font-size: 3vh;
`;

export const PopUp = ({ setSubmit }) => {
  const [isClick, setIsClick] = useState([false, false, false, false]);
  const [min, setMin] = useState("");

  const onClick = (id) => {
    if (id === "3m") setIsClick([true, false, false, false]);
    else if (id === "30m") setIsClick([false, true, false, false]);
    else if (id === "60m") setIsClick([false, false, true, false]);
    else if (id === "?m") setIsClick([false, false, false, true]);
    else setIsClick([false, false, false, false]);
  };

  const onChange = (e) => {
    setMin(e.target.value);
  };

  const onlyNumber = (e) => {
    if (
      (e.keyCode > 48 && e.keyCode < 57) ||
      e.keyCode === 8 ||
      e.keyCode === 37 ||
      e.keyCode === 39 ||
      e.keyCode === 46 ||
      e.keyCode === 39
    ) {
    } else e.preventDefault(false);
  };

  const onSubmit = () => {
    if (isClick[0] || isClick[1] || isClick[2] || (isClick[3] && min !== "")) setSubmit(false);
  };

  return (
    <>
      <Back />
      <Main>
        <MinBtn
          className={isClick[0] ? "click" : ""}
          onClick={() => {
            onClick("3m");
          }}
        >
          3min
        </MinBtn>
        <MinBtn
          className={isClick[1] ? "click" : ""}
          onClick={() => {
            onClick("30m");
          }}
        >
          30min
        </MinBtn>
        <MinBtn
          className={isClick[2] ? "click" : ""}
          onClick={() => {
            onClick("60m");
          }}
        >
          60min
        </MinBtn>
        <MinBtn
          className={isClick[3] ? "click" : ""}
          onClick={() => {
            onClick("?m");
          }}
        >
          {min === "" ? "?" : min}min
        </MinBtn>
        {isClick[3] ? <MinuteInput value={min} onKeyDown={onlyNumber} onChange={onChange} /> : ""}
        <MinBtn id="submit" onClick={onSubmit}>
          SEND
        </MinBtn>
      </Main>
    </>
  );
};
