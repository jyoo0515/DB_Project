import React, { useState, useEffect } from "react";
import apiClient from "../../utils/axios";
import "./editStyle.css";

export const EditPage = () => {
  const [myData, setMyData] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    apiClient.get("/users/me").then((res) => {
      setMyData(res.data);
      setStatusMessage(res.data.statusMessage);
      setLocation(res.data.location);
    });
  }, []);

  const logOut = () => {
    apiClient.get("/users/logout").catch((err) => console.log(err));
    document.location.href = "/";
  };

  const deleteAccount = () => {
    apiClient.delete("/users/me").catch((err) => console.log(err));
    document.location.href = "/";
  };

  const onChangeInput = (e) => {
    setStatusMessage(e.target.value);
  };

  const onChangeSelect = (e) => {
    setLocation(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (myData.statusMessage === statusMessage && myData.location === location) return;
    if (myData.statusMessage !== statusMessage)
      apiClient
        .patch("/users/me", {
          statusMessage: statusMessage,
          location: null,
        })
        .catch((err) => console.log(err));
    if (myData.location !== location)
      apiClient
        .patch("/users/me", {
          statusMessage: null,
          location: location,
        })
        .catch((err) => console.log(err));
    document.location.href = "/edit";
  };

  const returnToFriends = (e) => {
    e.preventDefault();
    document.location.href = "/friends";
  };

  return (
    <div>
      <div className="content">
        <div className="returnToFriends">
          <img src="../../../../leftArrow.png" className="returnImg" onClick={returnToFriends} />
        </div>
        <div className="edit"> EDIT </div>
        <div className="blackLine1"></div>
        <form className="formstyle" onSubmit={onSubmit}>
          <div className="word">STATUS MESSAGE</div>
          <input
            className="enterBox"
            placeholder={statusMessage === "null" || statusMessage === "" ? "상태 메세지를 입력하세요" : ""}
            onChange={onChangeInput}
            value={statusMessage}
          ></input>
          <div className="word">LOCATION</div>
          <select className="enterBox" defaultValue={myData.location} onChange={onChangeSelect} value={location}>
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
