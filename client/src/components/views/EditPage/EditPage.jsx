import React, { useState, useEffect } from "react";
import apiClient from "../../utils/axios";
import "./editStyle.css";
import { palette } from "@mui/system";

export const EditPage = () => {
  const [myData, setMyData] = useState({});
  useEffect(() => {
    apiClient.get("/users/me").then((res) => setMyData(res.data));
    console.log(myData);
  }, []);

  return (
    <div>
      <div className="content">
        <div className="edit"> EDIT </div>
        <div className="blackLine1"></div>
        <form className="formstyle">
          <div className="word">STATUS MESSAGE</div>
          <input className="enterBox"></input>
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
          <div className="editButton">
            <input type="reset" value="Reset">
              CANCEL
            </input>
          </div>
        </form>
        <div className="blackLine2"></div>
        <div className="logoutButton">LOG OUT</div>
        <div className="logoutButton">DELETE ACCOUNT</div>
      </div>
    </div>
  );
};
