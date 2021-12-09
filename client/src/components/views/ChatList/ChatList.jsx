import React, { useState, useEffect } from "react";
import "./ChatList.css";
import apiClient from "../../utils/axios";
import { NavBar } from "../NavBar/NavBar";

export const ChatList = (props) => {
  return (
    <div>
      <div className="container">
        <div></div>
        <div className="title">CHAT</div>
      </div>
      <hr style={{ height: "5px", backgroundColor: "black" }}></hr>
      <div className="friends">
        <Friend props={props} />
      </div>
      <NavBar />
    </div>
  );
};

function Friend({ props }) {
  const [myData, setMyData] = useState({});
  useEffect(() => {
    apiClient.get("/chats").then((res) => setMyData(res));
  }, []);
  const onClick = (i) => {
    props.history.push({
      pathname: `/chats/${i}`,
      state: { flag: 1 },
    });
    document.location.href = `/chats/${i}`;
  };
  const result = [];
  if (myData.status != 200) {
    return <div>잘못된 요청입니다</div>;
  }
  if (!Object.keys(myData.data).length) {
    return <div>생성된 채팅방이 없습니다.</div>;
  }
  for (const chat in myData.data) {
    const chats = myData.data[chat];
    const curstyle = chats.state == 1 ? "ButtonStyle" : "offlineButton";
    result.push(
      <div className="friend" key={chats.chatRoomId}>
        <div>
          <div>{chats.name}</div>
          <div style={{ height: "1vh" }}></div>
          <div style={{ color: "dimgray" }}>{chats.role}</div>
        </div>
        <div>
          <div>최근 채팅 시간</div> <div>{chats.lastOnline}</div>
        </div>
        <button className={curstyle} onClick={() => onClick(chats.chatRoomId)}>
          채팅
        </button>
      </div>
    );
  }
  return result;
}
