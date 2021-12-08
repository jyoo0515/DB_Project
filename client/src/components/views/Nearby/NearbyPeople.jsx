import React from "react";
import "./NearbyPeople.css";
import { useState, useEffect } from "react";
import apiClient from "../../utils/axios";
import { NavBar } from "../NavBar/NavBar";

export const NearbyPeople = (props) => {
  return (
    <div>
      <div className="container">
        <div></div>
        <div className="title">
          {props.match.params.locId == 0
            ? "공학관"
            : props.match.params.locId == 1
            ? "백양관"
            : props.match.params.locId == 2
            ? "신촌역"
            : "학생회관"}
        </div>
      </div>
      <hr style={{ height: "5px", backgroundColor: "black" }}></hr>
      <div className="friends">
        <div className="subtitle">ONLINE</div>
        <hr style={{ height: "3px", backgroundColor: "gray", width: "50%", marginLeft: "20px" }}></hr>
        <Friend2 props={props} />
      </div>
      <div className="friends">
        <div className="subtitle">OFFLINE</div>
        <hr style={{ height: "3px", backgroundColor: "gray", width: "50%", marginLeft: "20px" }}></hr>
        <Friend1 props={props} />
      </div>
      <NavBar />
    </div>
  );
};

function Friend1(props) {
  const [myData, setMyData] = useState({});
  useEffect(() => {
    apiClient.get(`/users/nearby/${props.props.match.params.locId}`).then((res) => setMyData(res));
  }, []);
  const result = [];
  for (const friend in myData.data) {
    const friends = myData.data[friend];
    if (friends.state == 1) continue;
    result.push(
      <div className="friend" key={friends.userId}>
        <div>
          <div>{friends.name}</div>
          <div style={{ height: "1vh" }}></div>
          <div style={{ color: "dimgray" }}>{friends.role}</div>
        </div>
        <div>{friends.statusMessage == "null" ? "상태메시지가 없습니다" : friends.statusMessage}</div>
        <GetButton id={friends.userId} />
      </div>
    );
  }
  return result;
}

function Friend2(props) {
  const [myData, setMyData] = useState({});
  useEffect(() => {
    apiClient.get(`/users/nearby/${props.props.match.params.locId}`).then((res) => setMyData(res));
  }, []);
  const result = [];
  for (const friend in myData.data) {
    const friends = myData.data[friend];
    if (friends.state == 0) continue;
    result.push(
      <div className="friend" key={friends.userId}>
        <div>
          <div>{friends.name}</div>
          <div style={{ height: "1vh" }}></div>
          <div style={{ color: "dimgray" }}>{friends.role}</div>
        </div>
        <div>{friends.statusMessage == "null" ? "상태메시지가 없습니다" : friends.statusMessage}</div>
        <GetButton id={friends.userId} />
      </div>
    );
  }
  return result;
}

function GetButton(id) {
  const [myChat, setMyChat] = useState({});
  useEffect(() => {
    apiClient.get(`/chats/${id.id}`).then((res) => setMyChat(res));
  }, []);
  const onClick = (i) => {
    document.location.href = `/chats/${i}`;
  };
  return (
    <button className="ButtonStyle" onClick={() => onClick(myChat.data.chatRoomId)}>
      채팅
    </button>
  );
}
