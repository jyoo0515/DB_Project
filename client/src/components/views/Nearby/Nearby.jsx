import React from "react";
import styled from "styled-components";
import { NavBar } from "../NavBar/NavBar";

export const Nearby = () => {
  const locs = ["공학관", "백양관", "신촌역", "학생회관"];

  const onClick = (i) => {
    document.location.href = `/nearby/people/${i}`;
  };

  return (
    <>
      <div style={{ height: "90vh" }}>
        {locs.map((loc, index) => {
          return <Location onClick={() => onClick(index)}>{loc}</Location>;
        })}
      </div>
      <NavBar />
    </>
  );
};

const Location = styled.div`
  margin: 2vh auto;
  width: 80vw;
  background-color: lightgray;
  color: black;
  border: none;
  font-weight: bold;
  font-size: 5rem;
  text-align: center;
  line-height: 20vh;
  overflow-wrap: break-word;
  &:hover {
    background-color: darkgray;
    color: white;
  }
`;
