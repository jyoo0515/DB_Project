import React from "react";
import { Route, Switch } from "react-router-dom";
import { ChatRoomPage } from "./ChatRoomPage/ChatRoomPage";
import { LandingPage } from "./LandingPage/LandingPage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { ChatList } from "./ChatList/ChatList";
import { Nearby } from "./Nearby/Nearby";
import { FriendSearchPage } from "./FriendSearchPage/FriendSearch";
import { FriendListPage } from "./FriendListPage/FriendList";
import { EditPage } from "./EditPage/EditPage";
import { Socket } from "./Socket/Socket";
import { NearbyPeople } from "./Nearby/NearbyPeople";
import Auth from "../../hoc/auth";

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, null)} />
        <Route exact path="/edit" component={Auth(EditPage, true)} />
        <Route exact path="/friends" component={Auth(FriendListPage, true)} />
        <Route exact path="/search" component={Auth(FriendSearchPage, true)} />
        <Route exact path="/nearby" component={Auth(Nearby, true)} />
        <Route exact path="/nearby/people/:locId" component={Auth(NearbyPeople, true)} />
        <Route exact path="/chats" component={Auth(ChatList, true)} />
        <Route exact path="/chats/:roomId" component={Auth(ChatRoomPage, true)} />
        <Route exact path="/socket/:roomId" component={Auth(Socket, true)} />
      </Switch>
    </div>
  );
};
