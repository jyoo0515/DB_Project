import React from "react";
import styled from "styled-components";

const Chat = styled.div`
  grid-area: chat1;
  margin: 0 auto;
  padding: 1vh 0;
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Msg = styled.div`
  vertical-align: bottom;
  margin: 1vh 1vw;
  border: 2px solid black;
  border-radius: 2em;
  padding: 1vh 1.5vw;
  width: 70vw;
  overflow-wrap: break-word;
  &.me {
    margin: 1vh 1vw 1vh 25vw;
    background-color: black;
    color: white;
  }
`;

export const ChatText = () => {
  return (
    <>
      <Chat>
        <Msg className="other">
          111
          <br />
          11
        </Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
        <Msg className="other">111</Msg>
        <Msg className="me">111</Msg>
      </Chat>
    </>
  );
};
