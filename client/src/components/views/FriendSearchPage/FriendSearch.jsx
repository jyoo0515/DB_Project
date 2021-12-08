import { useCallback, useEffect, useState } from "react";
import "./FriendSearch.css";
import apiClient from "../../utils/axios";
import { Link } from "react-router-dom";
import { RESERVED_EVENTS } from "socket.io/dist/socket";

export const FriendSearchPage = () => {
  const [reRender, setRender] = useState(false);
  const [word, setWord] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [result, setResult] = useState([]);
  const [userfl, setUserfl] = useState([]);
  const [myId, setMyId] = useState("");

  const onClickButton = (params) => {
    const tmp = document.getElementById(params.userId).value;
    if (tmp == "친구 추가") {
      apiClient.post("/friends", { friendId: params.userId }).catch((e) => {
        console.log(e);
      });
    } else {
      apiClient.delete(`/friends/${params.userId}`).catch((e) => {
        console.log(e);
      });
    }
    alert(`<${params.name}> ${tmp} 완료!`);
    setRender(`${tmp} + ${params.userId}`);
  };

  useEffect(() => {
    apiClient.get("/friends/").then((res) => {
      setUserfl(res.data.map((item) => item.userId));
    });
    //let tmparr = [...result];
    //setResult(tmparr);
  }, [reRender]);

  useEffect(() => {
    apiClient.get("users/me").then((res) => {
      setMyId(res.data.userId);
    });
  }, []);

  const onChangeWord = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (event) => {
    setDisabled(true);
    event.preventDefault();
    if (word == "") {
      alert("사용자 이름을 입력하세요.");
    } else {
      //search
      apiClient
        .get(`/users/search/${word}`)
        .then((res) => {
          setResult(res.data.users.filter((element) => element.userId !== myId));
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setWord("");
    setDisabled(false);
  };

  const onChangebt = (checkid) => {
    if (userfl.includes(checkid)) {
      return "친구 삭제";
    } else {
      return "친구 추가";
    }
  };

  const RenderResult = () => {
    //onChangebt(user.userId)

    return result.map((user) => (
      <div className="friend">
        <div>{user.name}</div>
        <div style={{ maxWidth: "80vh", padding: "15px" }}>{user.statusMessage}</div>
        <form>
          <input
            type="button"
            id={user.userId}
            className="ButtonStyle"
            value={onChangebt(user.userId)}
            onClick={() => onClickButton(user)}
          />
        </form>
      </div>
    ));
  };

  return (
    <div>
      <div className="friendcontainer">
        <div>
          <button className="ButtonStyle">
            <Link to="/friends" className="LinkStyle">
              go back
            </Link>
          </button>
        </div>
        <div style={{ fontSize: "40px", fontWeight: "bold" }}>SEARCH</div>
        <div></div>
      </div>
      <hr style={{ height: "5px", backgroundColor: "black" }}></hr>
      <div style={{ display: "flex", justifyContent: "space-evenly", margin: "3vh" }}>
        <form onSubmit={handleSubmit} style={{ width: "85%", display: "flex" }}>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
            <input
              style={{ width: "80%", height: "4vh", border: "0.5vh solid gray", padding: "0 0 0 2vh" }}
              type="text"
              placeholder="ID를 입력하세요"
              onChange={onChangeWord}
              value={word}
            />
            <button style={{ overflowWrap: "break-word" }} type="submit" className="ButtonStyle" disabled={disabled}>
              검색
            </button>
          </div>
        </form>
      </div>

      <div className="SearchResult">{RenderResult()}</div>
    </div>
  );
};
