import React, { useState, useEffect } from "react";
import apiClient from "../../utils/axios";
import "./editStyle.css";

export const EditPage = () => {
  const [myData, setMyData] = useState({});
  useEffect(() => {
    apiClient.get("/users/me").then((res) => setMyData(res.data));
    console.log(myData);
  }, []);

  const logOut = () => {
    apiClient.get("/users/logout").catch((err) => console.log(err));
    document.location.href = "/";
  };

  const deleteAccount = () => {
    apiClient.delete("/users/me").catch((err) => console.log(err));
    document.location.href = "/";
  };

  return (
    <div>
      <div className="content">
        <div className="edit"> EDIT </div>
        <div className="blackLine1"></div>
        <form className="formstyle">
          <div className="word">STATUS MESSAGE</div>
          <input className="enterBox" placeholder={myData.statusMessage}></input>
          <div className="word">LOCATION</div>
          <select className="enterBox">
            <option className="location" disabled selected>
              SELECT YOUR LOCATION
            </option>
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
