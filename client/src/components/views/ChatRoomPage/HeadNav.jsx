import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apiClient from "../../utils/axios";

export const HeadNav = ({ myData, otherId }) => {
  const [isFriend, setIsFriend] = useState(true);

  const changeFriendState = () => {
    setIsFriend(!isFriend);
    if (isFriend)
      apiClient
        .post("/friends/", {
          friendId: otherId,
        })
        .then((res) => {
          if (res.status !== 200) alert("apiClient.post('/friends/') ERROR");
        });
    else
      apiClient.get(`/friends/${otherId}`).then((res) => {
        if (res.status !== 200) alert("apiClient.get('/friends') ERROR");
      });
  };

  return (
    <>
      <HeadImg id="returnToChatList">
        <Link to="/chats">
          <Img id="leftArrow" />
        </Link>
      </HeadImg>
      <HeadName>{myData.name}</HeadName>
      <HeadImg id="changeFriendState" onClick={changeFriendState}>
        <Img id={isFriend ? "friendDelete" : "friendAdd"} />
      </HeadImg>
    </>
  );
};

const HeadImg = styled.button`
  border: none;
  background-color: transparent;
  margin: 0 auto;
  overflow: hidden;
  &#returnToChatList {
    grid-area: icon1;
  }
  &#changeFriendState {
    grid-area: icon2;
  }
`;

const Img = styled.img`
  margin: 0 auto;
  width: 100%;
  &#leftArrow {
    content: url("../../../../leftArrow.png");
    height: 50%;
  }
  &#friendDelete {
    content: url("../../../../friendDelete.png");
    height: 50%;
  }
  &#friendAdd {
    content: url("../../../../friendAdd.png");
    height: 50%;
  }
`;

const HeadName = styled.div`
  grid-area: name1;
  margin: 0 auto;
  padding-top: 1.5vh;
  font-size: 6vh;
`;
