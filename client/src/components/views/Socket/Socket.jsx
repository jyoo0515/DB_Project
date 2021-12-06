import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000/", {
  withCredentials: true,
});

export const Socket = (props) => {
  const roomId = props.match.params.roomId;

  const [msg, setMsg] = useState("");
  const [total, setTotal] = useState([]);

  useEffect(() => {
    socket.emit("enter_room", roomId);
    socket.on("error", (data) => {
      alert(data.message);
      document.location.href = "/chats";
    });
    socket.on("load_total", (messages) => {
      setTotal([...total, ...messages]);
    });
  }, [roomId]);

  useEffect(() => {
    socket.on("load_message", (message) => {
      console.log(message);
      setTotal([...total, message]);
    });
  });

  const onChangeHandle = (e) => {
    setMsg(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (msg) {
      socket.emit("send", { content: msg, timeLimit: null });
    }
    // socket.on("receive_message", (message) => console.log(message));
    setMsg("");
  };

  const renderMessage = () => {
    return total.map((message) => (
      <div key={message.id}>
        <h3>
          {message.fromId}:<span>{message.content}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div>
      <div>
        <h1>Chat Log</h1>
        {renderMessage()}
      </div>
      <form id="msgform" onSubmit={onSubmitHandle}>
        <input id="msginput" autoComplete="off" placeholder="메세지" onChange={onChangeHandle} value={msg} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};
