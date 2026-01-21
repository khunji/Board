import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate(); //페이지 이동을 도와줄 장치를 변수에 집어넣기

  useEffect(() => {
    //서버에게 연결 확인용으로 인사보내기
    axios.get("/api/hello").then((response) => {
      console.log(response.data);
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      //서버가 로그아웃 성공(success:true)라고 하면
      if (response.data.success) {
        navigate("/login"); //로그인 페이지로 이동
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      {/* 버튼을 누르면 onClickHandler 함수가 실행됨 */}
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
