import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import apiClient from "../../utils/axios";

const socket = io("http://localhost:5000/", {
  withCredentials: true,
});

export const Socket = (props) => {
  const roomId = props.match.params.roomId;
  const friendId = "ttmyId";

  const [msg, setMsg] = useState("");
  const [total, setTotal] = useState([]);

  useEffect(() => {
    socket.emit("enter_room", roomId);
    socket.on("load", (data) => {
      console.log(data);
      console.log(total);
    });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (message) => console.log(message));
  });

  // useEffect(() => {
  //   socket.on("load")
  // })

  const onChangeHandle = (e) => {
    setMsg(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    socket.emit("send_message", { friendId, msg });
    // socket.on("receive_message", (message) => console.log(message));
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
