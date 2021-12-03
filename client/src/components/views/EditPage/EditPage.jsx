import React from "react";
import { NavBar } from "../NavBar/NavBar";

import "./editStyle.css";
import axios from "axios";
import { accordionSummaryClasses } from "@mui/material";

export const EditPage = () => {
  axios.get("http://localhost:5000/api/users/me");

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
          <div className="editButton">CANCEL</div>
        </form>
        <div className="blackLine2"></div>
        <div className="logoutButton">LOG OUT</div>
        <div className="logoutButton">DELETE ACCOUNT</div>
      </div>
      <NavBar></NavBar>
    </div>
  );
};
