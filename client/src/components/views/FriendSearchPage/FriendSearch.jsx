import { useCallback, useState } from "react";
import "./FriendSearch.css";

export const FriendSearch = () => {
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
          <button className="ButtonStyle">go back</button>
        </div>
        <div style={{ fontSize: "40px", fontWeight: "bold" }}>SEARCH</div>
        <div></div>
      </div>
      <hr style={{ height: "5px", backgroundColor: "black" }}></hr>
      <div>
        <form className="container" onSubmit={handleSubmit}>
          <div></div>
          <div>
            <input name="friendinput" type="friendinput" placeholder="input test" value={value} onChange={onChange} />
          </div>
          <div>
            <button type="submit" className="ButtonStyle" disabled={disabled}>
              search
            </button>
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
    <div class="friend">
      <div>학생</div>
      <div>상태메시지</div>
      <button className="ButtonStyle">친구 삭제</button>
    </div>
  );
}
