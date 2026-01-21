import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate(); //페이지 이동 시켜주는 장치

  //1. 사용자의 정보를 저장할 그릇('state') 만들기
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  //2. 타이핑을 하면 State에 값을 넣어줘야
  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  //3. 로그인 버튼을 눌렀을 때
  const onSubmitHandler = async (event) => {
    event.preventDefault(); //페이지가 새로고침되는 것 막기

    //서버에 보낼 데이터
    const body = {
      email: Email,
      password: Password,
    };

    try {
      const response = await axios.post("api/users/login", body);

      if (response.data.loginSuccess) {
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("에러 발생", err);
    }
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LandingPage;
