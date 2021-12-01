import React from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import { LoginPage } from "../LoginPage/LoginPage";
import { ChatList } from "../ChatList/ChatList";
import { NearbyPeople } from "../NearbyPeople/NearbyPeople";

export const NavBar = () => {
  return (
    <>
      <Footer>
        <Btn id="linkingToMyFriends">
          <Link to="/login">
            <Img id="linkingToMyFriends" />
          </Link>
        </Btn>
        <Btn id="linkingToChatList">
          <Link to="/chatlist">
            <Img id="linkingToChatList" />
          </Link>
        </Btn>
        <Btn id="linkingToNearby">
          <Link to="/nearby/people">
            <Img id="linkingToNearby" />
          </Link>
        </Btn>
      </Footer>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/chatlist" component={ChatList} />
      <Route exact path="/nearby/people" component={NearbyPeople} />
    </>
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
