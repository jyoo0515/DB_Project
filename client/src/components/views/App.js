import React from "react";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { NavBar } from "./NavBar/NavBar";
import { ChatList } from "./ChatList/ChatList";

export const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/chatlist" component={ChatList} />
      </Switch>
    </div>
  );
};
