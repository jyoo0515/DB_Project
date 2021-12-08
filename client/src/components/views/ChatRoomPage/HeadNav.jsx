import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apiClient from "../../utils/axios";

export const HeadNav = ({ otherData }) => {
  const [isFriend, setIsFriend] = useState(true);

  useEffect(() => {
    apiClient
      .get("/friends")
      .then((res) => {
        const iD = res.data.find((user) => {
          console.log(user);
          return user.id === otherData.friendId;
        });
        if (iD === undefined) setIsFriend(false);
        else setIsFriend(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeFriendState = () => {
    if (!isFriend)
      apiClient
        .post("/friends", {
          friendId: otherData.friendId,
        })
        .catch((err) => console.log(err));
    else apiClient.delete(`/friends/${otherData.friendId}`).catch((err) => console.log(err));
    setIsFriend(!isFriend);
  };

  return (
    <>
      <HeadImg id="returnToChatList">
        <Link to="/chats">
          <Img id="leftArrow" src="/leftArrow.png" />
        </Link>
      </HeadImg>
      <HeadName>{otherData.name}</HeadName>
      <HeadImg id="changeFriendState" onClick={changeFriendState}>
        <Img id={isFriend ? "friendDelete" : "friendAdd"} src={isFriend ? "/friendDelete.png" : "/friendAdd.png"} />
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
    height: 50%;
  }
  &#friendDelete {
    height: 50%;
  }
  &#friendAdd {
    height: 50%;
  }
`;

const HeadName = styled.div`
  grid-area: name1;
  margin: 0 auto;
  padding-top: 1.5vh;
  font-size: 6vh;
`;
