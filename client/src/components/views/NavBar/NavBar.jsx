import React from "react";
import styled from "styled-components";

export const NavBar = () => {
  return (
    <Footer>
      <Btn id="linkingToMyFriends">
        <Img id="linkingToMyFriends" />
      </Btn>
      <Btn id="linkingToChatList">
        <Img id="linkingToChatList" />
      </Btn>
      <Btn id="linkingToNearBy">
        <Img id="linkingToNearBy" />
      </Btn>
    </Footer>
  );
};

const Footer = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  background-color: gray;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: "myFriends . chatList . nearBy";
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
  &#linkingToNearBy {
    grid-area: nearBy;
  }
`;

const Img = styled.img`
  margin: 0 auto;
  width: 100%;
  &#linkingToMyFriends {
    content: url("../../../../linkingToMyFriends.png");
    height: 60%;
  }
  &#linkingToChatList {
    content: url("../../../../linkingToChatList.png");
    height: 60%;
  }
  &#linkingToNearBy {
    content: url("../../../../linkingToNearBy.png");
    height: 60%;
  }
`;
