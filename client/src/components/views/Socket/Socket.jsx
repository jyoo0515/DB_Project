import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import apiClient from "../../utils/axios";

const socket = io("http://localhost:5000/", {
  withCredentials: true,
});

export const Socket = (props) => {
  let userData, roomId;

  useEffect(async () => {
    userData = (await apiClient.get("/users/me")).data;
    roomId = props.match.params.roomId;
    console.log(userData);
    console.log(roomId);

    socket.emit("enter_room", roomId);
    socket.on("load", (data) => console.log(data));

    socket.on("receive_message", (data) => {
      console.log(data);
    });
  });

  const [msg, setMsg] = useState("");
  const onChangeHandle = (e) => {
    setMsg(e.target.value);
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    socket.emit("message", msg);
    socket.on("message", (message) => console.log(message));
    setMsg("");
  };
  return (
    <div>
      <form id="msgform" onSubmit={onSubmitHandle}>
        <input id="msginput" autoComplete="off" placeholder="메세지" onChange={onChangeHandle} value={msg} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};
