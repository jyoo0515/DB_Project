import { useCallback, useEffect, useState } from "react";
import "./FriendList.css";
import { Link } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import apiClient from "../../utils/axios";

export const FriendListPage = () => {
  const [myinfo, setMyinfo] = useState({});
  const [online, setOnline] = useState([]);
  const [offline, setOffline] = useState([]);
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    //get my info
    apiClient
      .get("/users/me")
      .then((res) => {
        setMyinfo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    //get my friends and split into two array - on/off
    apiClient
      .get("/friends")
      .then((res) => {
        let off = [];
        let on = [];
        res.data.forEach((user) => {
          if (user.state === 1) {
            on.push(user);
          } else if (user.userId == myinfo.userId) {
            //do notthing
          } else off.push(user);
        });
        setOnline(on);
        off.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          if (a.name === b.name) return 0;
        });
        setOffline(off);
        console.log(offline);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getChatRoomId = (otherId) => {
    console.log(otherId);
    let RoomId = 0;
    apiClient
      .get(`/chats/${otherId}`)
      .then((res) => {
        RoomId = res.data.chatRoomId;
      })
      .catch((e) => {
        console.log(e);
      });
    return RoomId;
  };

  const RenderMyinfo = () => {
    return (
      <div className="friend">
        <div>
          <div>{myinfo.name}</div>
          <div style={{ height: "1vh" }}></div>
          <div style={{ color: "dimgray" }}>{myinfo.location}</div>
        </div>
        <div style={{ maxWidth: "80vh", padding: "15px" }}>{myinfo.statusMessage}</div>
        <button className="ButtonStyle">
          <Link to="/edit">편집</Link>
        </button>
      </div>
    );
  };

  const RenderOnline = () => {
    return online.map((user) => (
      <div className="friend">
        <div>
          <div>{user.name}</div>
          <div style={{ height: "1vh" }}></div>
          <div style={{ color: "dimgray" }}>{`(${user.role})`}</div>
        </div>
        <div style={{ maxWidth: "80vh", padding: "15px" }}>{user.statusMessage}</div>
        <button className="ButtonStyle">
          <Link to={`/chats/${getChatRoomId(user.userId)}`}>채팅</Link>
        </button>
      </div>
    ));
  };

  const RenderOffline = () => {
    return offline.map((user) => (
      <div className="friend">
        <div>
          <div>{user.name}</div>
          <div style={{ height: "1vh" }}></div>
          <div style={{ color: "dimgray" }}>{`(${user.role})`}</div>
        </div>
        <div style={{ maxWidth: "80vh", padding: "15px" }}>{user.statusMessage}</div>
        <button className="offlineButton">
          <Link to="/edit">채팅</Link>
        </button>
      </div>
    ));
  };

  return (
    <div>
      <div className="friendcontainer">
        <div></div>
        <div style={{ fontSize: "40px", fontWeight: "bold" }}>MY FRIENDS</div>
        <div>
          <button className="ButtonStyle">
            <Link to="/search">search</Link>
          </button>
        </div>
      </div>

      <hr style={{ height: "5px", backgroundColor: "black" }}></hr>
      <div style={{ padding: "10px" }}></div>
      <div className="SearchResult">
        <div style={{ padding: "5px", textAlign: "center", fontSize: "20px" }}> 내 정보</div>
        <hr style={{ height: "3px", backgroundColor: "gray", width: "50%" }}></hr>
        {RenderMyinfo()}
      </div>
      <div style={{ padding: "10px" }}></div>

      <div>
        <div style={{ padding: "5px", textAlign: "center", fontSize: "20px" }}> 접속 중인 친구 목록</div>
        <hr style={{ height: "3px", backgroundColor: "gray", width: "50%" }}></hr>
        <div className="SearchResult">{RenderOnline()}</div>
      </div>

      {/* offline*/}
      <div>
        <div style={{ padding: "5px", textAlign: "center", fontSize: "20px" }}> 미접속 중인 친구 목록</div>
        <hr style={{ height: "3px", backgroundColor: "gray", width: "50%" }}></hr>
        <div className="SearchResult">{RenderOffline()}</div>
        <div style={{ padding: "5vh" }}></div>
        <NavBar />
      </div>
    </div>
  );
};
