import React, { useState } from "react";
import styled from "styled-components";

export const HeadNav = () => {
  const [isFriend, setIsFriend] = useState(true);

  const returnToPrevPage = () => {
    console.log("return");
  };

  const changeFriendState = (e) => {
    setIsFriend(!isFriend);
  };

  return (
    <>
      <HeadImg id="returnToChatList" onClick={returnToPrevPage}>
        <Img id="leftArrow" />
      </HeadImg>
      <HeadName>권동욱</HeadName>
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
