import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HeadNav } from "./HeadNav";
import { ChatText } from "./ChatText";
import { FootNav } from "./FootNav";
import apiClient from "../../utils/axios";

export const ChatRoomPage = () => {
  const [myData, setMyData] = useState({});
  const [otherId, setOtherId] = useState("");

  useEffect(() => {
    apiClient.get("/users/me").then((res) => {
      if (res.status !== 200) alert("apiClient.get('/users/me') ERROR");
      else setMyData(res.data);
    });
    apiClient.get("/chats").then((res) => {
      if (res.status !== 200) alert("apiClient.get('/chats') ERROR");
      else console.log(res);
    });
  }, []);

  return (
    <ChatRoom>
      <HeadNav myData={myData} otherId={otherId} />
      <ChatText roomId={(props) => props.match.params.roomId} />
      <FootNav roomId={(props) => props.match.params.roomId} />
    </ChatRoom>
  );
};

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
