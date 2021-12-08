import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HeadNav } from "./HeadNav";
import { ChatText } from "./ChatText";
import { FootNav } from "./FootNav";
import apiClient from "../../utils/axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000/", {
  withCredentials: true,
});

export const ChatRoomPage = (props) => {
  const [myData, setMyData] = useState({});
  const [otherData, setOtherData] = useState({});
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    apiClient
      .get("/users/me")
      .then((res) => {
        setMyData(res.data);
      })
      .catch((err) => console.log(err));
    apiClient
      .get(`/chats/other/${props.match.params.roomId}`)
      .then((res) => {
        setOtherData(res.data);
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/friends")
      .then((res) => {
        setFriendList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(friendList);

  return (
    <ChatRoom>
      <HeadNav otherData={otherData} friendList={friendList} props={props} />
      <ChatText socket={socket} myData={myData} roomId={props.match.params.roomId} />
      <FootNav socket={socket} />
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
