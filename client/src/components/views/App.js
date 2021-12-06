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

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/edit" component={EditPage} />
        <Route exact path="/friends" component={FriendListPage} />
        <Route exact path="/search" component={FriendSearchPage} />
        <Route exact path="/nearby" component={Nearby} />
        <Route exact path="/nearby/people/:locId" component={NearbyPeople} />
        <Route exact path="/chats" component={ChatList} />
        <Route exact path="/chats/:roomId" component={ChatRoomPage} />
        <Route exact path="/socket/:roomId" component={Socket} />
      </Switch>
    </div>
  );
};
