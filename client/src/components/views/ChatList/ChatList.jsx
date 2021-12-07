import React, { useState, useEffect } from "react";
import "./ChatList.css";
import apiClient from "../../utils/axios";

export const ChatList = () => {
  const [myData, setMyData] = useState({});
  useEffect(() => {
    apiClient.get("/chats").then((res) => setMyData(res.data));
  }, []);
  return (
    <div>
      <div className="container">
        <div></div>
        <div className="title">CHAT</div>
      </div>
      <hr style={{ height: "5px", backgroundColor: "black" }}></hr>
      <div class="friends">
        <Friend />
      </div>
    </div>
  );
};

function Friend() {
  const result = [];
  apiClient.get("/chats").then(function (res) {
    console.log(res.status);
    console.log(res.data);
    if (res.status != 200) {
      return <div>잘못된 요청입니다</div>;
    }
    console.log(Object.keys(res.data).length);
    if (!Object.keys(res.data).length) {
      console.log("no data");
      return <div>생성된 채팅방이 없습니다.</div>;
    }
    for (const chats in res.data) {
      result.push(
        <div className="friend">
          <div>{chats.friendId}</div>
          <div style={{ display: "flex" }}>
            <div>채팅 메시지</div>
            <div>{chats.lastOnline}</div>
          </div>
          <button className="ButtonStyle">채팅</button>
        </div>
      );
    }
    return result;
  });
  return result;
}
