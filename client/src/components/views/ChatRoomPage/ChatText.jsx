import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";

export const ChatText = ({ socket, myData, roomId }) => {
  const myId = myData.userId;
  const myLoc = myData.location;
  const [total, setTotal] = useState([]);

  useEffect(() => {
    socket.emit("enter_room", roomId);
    socket.on("error", (data) => {
      alert(data.message);
      document.location.href = "/chats";
    });
    socket.on("load_total", (messages) => {
      setTotal([...total, ...messages]);
    });
  }, [roomId]);

  useEffect(() => {
    socket.on("load_message", (message) => {
      setTotal([...total, message]);
    });
  });

  const renderMessage = () => {
    return total.map((message) => (
      <div key={message.id} align={message.fromId === myId ? "right" : "left"}>
        {message.fromId === myId ? (
          <Time className="me">
            {message.createdAt}&nbsp;{message.readStatus === 1 ? "읽음" : "안 읽음"}
            {message.expiresAt === null ? "" : `( ${myLoc} ${message.expiresAt}에 삭제됨 )`}
          </Time>
        ) : (
          ""
        )}
        <Msg className={message.fromId === myId ? "me" : "other"}>{message.content}</Msg>
        {message.fromId === myId ? (
          ""
        ) : (
          <Time className="other">
            {message.createdAt}&nbsp;{message.readStatus === 1 ? "읽음" : "안 읽음"}
            {message.expiresAt === null ? "" : `( ${myLoc} ${message.expiresAt}에 삭제됨 )`}
          </Time>
        )}
      </div>
    ));
  };

  return <STB>{renderMessage()}</STB>;
};

const STB = styled(ScrollToBottom)`
  grid-area: chat1;
  margin: 0 auto;
  padding: 1vh 0;
  width: 100%;
`;

const Msg = styled.div`
  display: inline-block;
  vertical-align: bottom;
  margin: 1vh 1vw;
  border: 2px solid black;
  border-radius: 2em;
  padding: 1vh 1.5vw;
  max-width: 70vw;
  overflow-wrap: break-word;
  &.me {
    background-color: black;
    color: white;
  }
  font-size: 1.2rem;
`;

const Time = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  margin: 0 auto;
  padding-bottom: 0.7rem;
  &.me {
    color: black;
  }
`;
