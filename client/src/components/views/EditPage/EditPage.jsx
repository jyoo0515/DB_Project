import React, { useState, useEffect } from "react";
import { StrictEventEmitter } from "socket.io/dist/typed-events";
import apiClient from "../../utils/axios";
import "./editStyle.css";

export const EditPage = () => {
  const [myData, setMyData] = useState({});
  useEffect(() => {
    apiClient.get("/users/me").then((res) => setMyData(res.data));
  }, []);

  const logOut = () => {
    apiClient.get("/users/logout").catch((err) => console.log(err));
    document.location.href = "/";
  };

  const deleteAccount = () => {
    apiClient
      .delete("/users/me")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    document.location.href = "/";
  };

  const editAccount = (event) => {
    event.preventDefault();
    const editData = new FormData(event.currentTarget);
    const editStatus = {
      statusMessage: editData.get("editStatus"),
      location: null,
    };

    const editLocation = {
      statusMessage: null,
      location: editData.get("editLocation"),
    };

    apiClient.patch("/users/me", editStatus).then((res) => console.log(res.data));
    apiClient.patch("/users/me", editLocation).then((res) => console.log(res.data));
  };

  return (
    <div>
      <div className="content">
        <div className="edit"> EDIT </div>
        <div className="blackLine1"></div>
        <form className="formstyle" onSubmit={editAccount}>
          <div className="word">STATUS MESSAGE</div>
          <input
            className="enterBox"
            placeholder={myData.statusMessage === "null" ? "상태 메세지를 입력하세요" : myData.statusMessage}
            id="editStatus"
          ></input>
          <div className="word">LOCATION</div>
          <select className="enterBox" defaultValue="공학관" id="editLocation">
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
