import { useCallback, useEffect, useState } from "react";
import "./FriendSearch.css";
import apiClient from "../../utils/axios";
import { Link } from "react-router-dom";

export const FriendSearchPage = () => {
  const [word, setWord] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [FriendArray, setFriendArray] = useState([]);
  const [userfl, setUserfl] = useState([]);

  useEffect(() => {
    apiClient.get("/friends/").then((res) => {
      setUserfl(res.data.map((item) => item.userId));
    });
  }, [FriendArray]);

  const onChangeWord = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (event) => {
    setDisabled(true);
    event.preventDefault();
    console.log(word);
    if (word == "") {
      alert("사용자 이름을 입력하세요.");
    } else {
      //search
      apiClient
        .get(`/users/${word}`)
        .then((res) => {
          setFriendArray(
            res.data.users.map((friend) => (
              <Friend name={friend.name} mes={friend.statusMessage} isfriend={userfl.includes(friend.userId)} />
            ))
          );
          console.log(userfl);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setWord("");
    setDisabled(false);
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
      <div className="SearchResult">{FriendArray.map((item) => item)}</div>
    </div>
  );
};

function Friend({ name, mes, isfriend }) {
  const [fr, setfr] = useState(isfriend ? "친구삭제" : "친구추가");

  const onChangeFr = (e) => {
    setfr(e.target.value);
  };

  return (
    <div className="friend">
      <div>{name}</div>
      <div style={{ maxWidth: "80vh", padding: "15px" }}>{mes}</div>
      <button className="ButtonStyle">{fr}</button>
    </div>
  );
}
