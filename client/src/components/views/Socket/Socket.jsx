import React, { useState } from "react";
import io from "socket.io-client"; //모듈 가져오기

const socket = io("http://localhost:5000/", {
  withCredentials: true,
});

export const Socket = () => {
  const [msg, setMsg] = useState("");
  const onChangeHandle = (e) => {
    setMsg(e.target.value);
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    // socket.emit("message", msg);
    socket.emit("joinRoom");
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
