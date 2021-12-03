import { useCallback, useState } from "react";
import "./FriendList.css";
import { Link } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";

export const FriendListPage = () => {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 500));
    if (value.length < 1) {
      alert("사용자 이름을 입력하세요.");
    } else {
      alert(`검색: ${value}`);
    }
    setValue("");
    setDisabled(false);
  };

  return (
    <div>
      <div className="container">
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
        <div style={{ padding: "5px", textAlign: "center", fontSize: "20px" }}> 접속 중인 친구 목록</div>
        <hr style={{ height: "3px", backgroundColor: "gray", width: "50%" }}></hr>
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </div>

      {/* offline*/}
      <div className="SearchResult">
        <div style={{ padding: "5px", textAlign: "center", fontSize: "20px" }}> 미접속중인 친구 목록</div>
        <hr style={{ height: "3px", backgroundColor: "gray", width: "50%" }}></hr>
        <Friend />
      </div>

      <div style={{ padding: "5vh" }}></div>
      <NavBar />
    </div>
  );
};

function Friend() {
  return (
    <div className="friend">
      <div>학생</div>
      <div style={{ maxWidth: "80vh", padding: "15px" }}>상태메시지</div>
      <button className="ButtonStyle">친구 삭제</button>
    </div>
  );
}
