import React, { useState, useEffect } from "react";
import { StrictEventEmitter } from "socket.io/dist/typed-events";
import apiClient from "../../utils/axios";
import "./editStyle.css";

export const EditPage = () => {
  const [myData, setMyData] = useState({});
  const [statusMessage, setStatus] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    apiClient.get("/users/me").then((res) => {
      setMyData(res.data);
      setStatus(res.data.statusMessage);
      setLocation(res.data.location);
    });
  }, []);

  const logOut = () => {
    apiClient.get("/users/logout").catch((err) => console.log(err));
    document.location.href = "/login";
  };

  const deleteAccount = () => {
    apiClient
      .delete("/users/me")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    document.location.href = "/login";
  };

  const onStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const onLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const editAccount = (event) => {
    event.preventDefault();

    const statusMessageGroup = {
      statusMessage,
      location: null,
    };

    const locationGroup = {
      statusMessage: null,
      location,
    };

    if (statusMessage.length > 20) {
      alert("상태 메세지는 최대 20자로 변경 가능합니다.");
    } else {
      if (statusMessage !== "") {
        apiClient.patch("/users/me", statusMessageGroup).then((res) => console.log(res.data));
      }
      if (location !== "") {
        apiClient.patch("/users/me", locationGroup).then((res) => console.log(res.data));
      }
      document.location.href = "/edit";
    }
  };

  return (
    <div>
      <div className="content">
        <a href="/friends">
          <img className="leftArr" src="leftArrow.png" />
        </a>
        <div className="edit"> EDIT </div>
        <div className="blackLine1"></div>
        <form className="formstyle" onSubmit={editAccount}>
          <div className="word">STATUS MESSAGE</div>
          <input
            onChange={onStatusChange}
            className="enterBox"
            placeholder={myData.statusMessage === "null" ? "상태 메세지를 입력하세요" : myData.statusMessage}
            id="editStatus"
          ></input>
          <div className="checkText">{statusMessage.length}/20</div>
          <div className="word">LOCATION</div>
          <select className="enterBox" onChange={onLocationChange} value={location} defaultValue={myData.location}>
            <option className="location" value="공학관">
              공학관
            </option>
            <option className="location" value="백양관">
              백양관
            </option>
            <option className="location" value="신촌역">
              신촌역
            </option>
            <option className="location" value="학생회관">
              학생회관
            </option>
          </select>
          <div>
            <button className="editButton" type="submit">
              EDIT
            </button>
          </div>
          <div>
            <button className="editButton" type="reset">
              RESET
            </button>
          </div>
        </form>
        <div className="blackLine2"></div>
        <div className="logoutButton" onClick={logOut}>
          LOG OUT
        </div>
        <div className="logoutButton" onClick={deleteAccount}>
          DELETE ACCOUNT
        </div>
      </div>
    </div>
  );
};
