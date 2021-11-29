import React, { useState } from "react";
import styled from "styled-components";

const HeadImg = styled.button`
  border: none;
  background-color: transparent;
  margin: 0 auto;
  font-size: 3rem;
  &#ReturnToChatList {
    grid-area: icon1;
  }
  &#ChangeFriendState {
    grid-area: icon2;
  }
`;

const HeadName = styled.div`
  grid-area: name1;
  text-align: center;
  font-size: 3rem;
`;

export const HeadNav = () => {
  const [isFriend, setIsFriend] = useState(true);

  const changeFriendState = (e) => {
    setIsFriend(!isFriend);
  };

  return (
    <>
      <HeadImg id="ReturnToChatList">←</HeadImg>
      <HeadName>권동욱</HeadName>
      <HeadImg id="ChangeFriendState" onClick={changeFriendState}>
        {isFriend ? "🗑️" : "➕"}
      </HeadImg>
    </>
  );
};
