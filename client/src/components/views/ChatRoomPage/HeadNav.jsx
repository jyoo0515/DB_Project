import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apiClient from "../../utils/axios";

export const HeadNav = ({ otherData, friendList, props }) => {
  const [isFriend, setIsFriend] = useState(
    friendList.find((user) => {
      return user.userId === otherData.userId;
    }) === undefined
      ? false
      : true
  );

  useEffect(() => {
    setIsFriend(
      friendList.find((user) => {
        return user.userId === otherData.userId;
      }) === undefined
        ? false
        : true
    );
  }, [friendList]);

  const changeFriendState = () => {
    if (!isFriend)
      apiClient
        .post("/friends", {
          friendId: otherData.userId,
        })
        .catch((err) => console.log(err));
    else apiClient.delete(`/friends/${otherData.userId}`).catch((err) => console.log(err));
    setIsFriend(!isFriend);
  };

  return (
    <>
      <HeadImg id="returnToChatList">
        <Img
          id="leftArrow"
          src="/leftArrow.png"
          onClick={() => {
            if (props.location.state.flag === 0) document.location.href = "/friends";
            else if (props.location.state.flag === 1) document.location.href = "/chats";
            else document.location.href = `/nearby/people/${props.location.state.flag - 2}`;
          }}
        />
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
