import React from "react";
import styled from "styled-components";

export const ChatText = () => {
  const date = "2022-01-04";
  const time = "00:00";
  const isRead = false;
  const isReadPrime = true;
  const location = "컴실";
  const deleteTime = "23:59:59";

  return (
    <>
      <Chat>
        <div>
          <Msg className="other">
            1112323111111
            <br />
            111111111
          </Msg>
          <Time className="other">
            {date}&nbsp;
            {time}&nbsp;
            {isRead ? "읽음" : "안 읽음"}&nbsp; (&nbsp;{location}&nbsp;{deleteTime}에 삭제됨&nbsp;)
          </Time>
        </div>
        <div align="right">
          <Time className="me">
            {date}&nbsp;
            {time}&nbsp;
            {isRead ? "읽음" : "안 읽음"}
          </Time>
          <Msg className="me">111</Msg>
        </div>
        <div align="right">
          <Time className="me">
            {date}&nbsp;
            {time}&nbsp;
            {isReadPrime ? "읽음" : "안 읽음"}&nbsp; (&nbsp;{location}&nbsp;{deleteTime}에 삭제됨&nbsp;)
          </Time>
          <Msg className="me">ㅋ</Msg>
        </div>
        <div>
          <Msg className="other">ㅎ</Msg>
          <Time className="other">
            {date}&nbsp;
            {time}&nbsp;
            {isReadPrime ? "읽음" : "안 읽음"}
          </Time>
        </div>
        <div>
          <Msg className="other">
            1112323111111
            <br />
            111111111
          </Msg>
          <Time className="other">
            {date}&nbsp;
            {time}&nbsp;
            {isRead ? "읽음" : "안 읽음"}&nbsp; (&nbsp;{location}&nbsp;{deleteTime}에 삭제됨&nbsp;)
          </Time>
        </div>
        <div align="right">
          <Time className="me">
            {date}&nbsp;
            {time}&nbsp;
            {isRead ? "읽음" : "안 읽음"}
          </Time>
          <Msg className="me">111</Msg>
        </div>
        <div align="right">
          <Time className="me">
            {date}&nbsp;
            {time}&nbsp;
            {isReadPrime ? "읽음" : "안 읽음"}&nbsp; (&nbsp;{location}&nbsp;{deleteTime}에 삭제됨&nbsp;)
          </Time>
          <Msg className="me">ㅋ</Msg>
        </div>
        <div>
          <Msg className="other">ㅎ</Msg>
          <Time className="other">
            {date}&nbsp;
            {time}&nbsp;
            {isReadPrime ? "읽음" : "안 읽음"}
          </Time>
        </div>
        <div>
          <Msg className="other">
            1112323111111
            <br />
            111111111
          </Msg>
          <Time className="other">
            {date}&nbsp;
            {time}&nbsp;
            {isRead ? "읽음" : "안 읽음"}&nbsp; (&nbsp;{location}&nbsp;{deleteTime}에 삭제됨&nbsp;)
          </Time>
        </div>
        <div align="right">
          <Time className="me">
            {date}&nbsp;
            {time}&nbsp;
            {isRead ? "읽음" : "안 읽음"}
          </Time>
          <Msg className="me">111</Msg>
        </div>
        <div align="right">
          <Time className="me">
            {date}&nbsp;
            {time}&nbsp;
            {isReadPrime ? "읽음" : "안 읽음"}&nbsp; (&nbsp;{location}&nbsp;{deleteTime}에 삭제됨&nbsp;)
          </Time>
          <Msg className="me">ㅋ</Msg>
        </div>
        <div>
          <Msg className="other">ㅎ</Msg>
          <Time className="other">
            {date}&nbsp;
            {time}&nbsp;
            {isReadPrime ? "읽음" : "안 읽음"}
          </Time>
        </div>
      </Chat>
    </>
  );
};

const Chat = styled.div`
  grid-area: chat1;
  margin: 0 auto;
  padding: 1vh 0;
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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
  &.other {
  }
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
  &.other {
  }
  &.me {
    color: black;
  }
`;
