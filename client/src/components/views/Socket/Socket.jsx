import React from "react";
import io from "socket.io-client"; //모듈 가져오기

const socket = io("http://localhost:5000/");

export const Socket = () => {
  const onclick = (e) => {
    const str = "hwi";
    socket.emit("alert", str);
  };
  return (
    <div>
      <button onClick={onclick}>알림창 보내기</button>
    </div>
  );
};
