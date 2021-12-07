import React from "react";
import "./NearbyPeople.css";

export const NearbyPeople = () => {
  return (
    <div>
      <div className="container">
        <div></div>
        <div className="title">공학관</div>
      </div>
      <hr style={{ height: "5px", backgroundColor: "black" }}></hr>
      <div className="friends">
        <div className="subtitle">ONLINE</div>
        <Friend />
        <Friend />
      </div>
      <div className="friends">
        <div className="subtitle">OFFLINE</div>
        <Friend />
        <Friend />
      </div>
    </div>
  );
};

function Friend() {
  return (
    <div className="friend">
      <div>학생A(학생)</div>
      <div>상태메시지</div>
      <button className="ButtonStyle">채팅</button>
    </div>
  );
}
