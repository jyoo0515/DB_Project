import React from "react";
import styled from "styled-components";
import { HeadNav } from "./HeadNav";
import { ChatText } from "./ChatText";
import { FootNav } from "./FootNav";

const ChatRoom = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-template-areas:
    "icon1 name1 name1 name1 icon2"
    "chat1 chat1 chat1 chat1 chat1"
    "chat1 chat1 chat1 chat1 chat1"
    "chat1 chat1 chat1 chat1 chat1"
    "chat1 chat1 chat1 chat1 chat1"
    "chat1 chat1 chat1 chat1 chat1"
    "chat1 chat1 chat1 chat1 chat1"
    "text1 text1 text1 text1 butn1"
    "text1 text1 text1 text1 butn2";
  height: 100vh;
`;

export const ChatRoomPage = () => {
  return (
    <ChatRoom>
      <HeadNav />
      <ChatText />
      <FootNav />
    </ChatRoom>
  );
};
