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
    setRender(`${tmp} + ${params.userId}`);
    console.log(reRender);
  };

  useEffect(() => {
    apiClient.get("/friends/").then((res) => {
      setUserfl(res.data.map((item) => item.userId));
    });
    let tmparr = [...result];
    setResult(tmparr);
  }, [reRender]);

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
        .get(`/users/${word}`)
        .then((res) => {
          setResult([...res.data.users]);
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
      <div className="container">
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
      <div style={{ margin: "20px 50px 10px 50px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <input
              style={{ width: "75%", height: "4vh", border: "0.5vh solid gray", padding: "0 0 0 2vh" }}
              type="text"
              placeholder="ID를 입력하세요"
              onChange={onChangeWord}
              value={word}
              required
            />
            <div>
              <button style={{ overflowWrap: "break-word" }} type="submit" className="ButtonStyle" disabled={disabled}>
                search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="SearchResult">{RenderResult()}</div>
    </div>
  );
};
