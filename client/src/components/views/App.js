import React from "react";
import { Route, Switch } from "react-router-dom";
import { ChatRoomPage } from "./ChatRoomPage/ChatRoomPage";
import { LandingPage } from "./LandingPage/LandingPage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { NavBar } from "./NavBar/NavBar";
import { FriendSearchPage } from "./FriendSearch/FriendSearch";

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/friendsearch" component={FriendSearchPage} />
        <Route exact path="/chatroom" component={ChatRoomPage} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
};
