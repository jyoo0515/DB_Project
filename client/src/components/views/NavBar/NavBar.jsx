import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBar = () => {
  const onClickMyFriends = () => {
    window.location.replace("/friends");
  };

  const onClickChatList = () => {
    window.location.replace("/chats");
  };

  const onClickNearBy = () => {
    window.location.replace("/nearby");
  };

  return (
    <>
      <Footer>
        <Btn id="linkingToMyFriends" onClick={onClickMyFriends}>
          <Img id="linkingToMyFriends" />
        </Btn>
        <Btn id="linkingToChatList" onClick={onClickChatList}>
          <Img id="linkingToChatList" />
        </Btn>
        <Btn id="linkingToNearby" onClick={onClickNearBy}>
          <Img id="linkingToNearby" />
        </Btn>
      </Footer>
    </>
  );
};

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  background-color: gray;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: "myFriends . chatList . nearby";
`;

const Btn = styled.button`
  border: none;
  background-color: transparent;
  margin: 0 auto;
  overflow: hidden;
  &#linkingToMyFriends {
    grid-area: myFriends;
  }
  &#linkingToChatList {
    grid-area: chatList;
  }
  &#linkingToNearby {
    grid-area: nearby;
  }
`;

const Img = styled.img`
  margin: 0 auto;
  width: 70%;
  height: 70%;
  filter: invert(100%);
  &#linkingToMyFriends {
    content: url("../../../../linkingToMyFriends.png");
  }
  &#linkingToChatList {
    content: url("../../../../linkingToChatList.png");
  }
  &#linkingToNearby {
    content: url("../../../../linkingToNearBy.png");
  }
`;
