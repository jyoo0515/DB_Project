import { useCallback, useState } from "react";
import "./FriendSearch.css";
import { Link } from "react-router-dom";

export const FriendSearchPage = () => {
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
              style={{ width: "75%", height: "4vh" }}
              name="friendinput"
              type="friendinput"
              placeholder="ID를 입력하세요"
              value={value}
              onChange={onChange}
            />
            <div>
              <button style={{ overflowWrap: "break-word" }} type="submit" className="ButtonStyle" disabled={disabled}>
                search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="SearchResult">
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
    </div>
  );
};

function Friend() {
  return (
    <div className="friend">
      <div>학생</div>
      <div style={{ maxWidth: "80vh", padding: "15px" }}>안녕하세요 저는 임채림입니다 카톡하지말아주세요</div>
      <button className="ButtonStyle">친구 삭제</button>
    </div>
  );
}
