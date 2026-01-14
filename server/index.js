const express = require("express");
const app = express(); //express 앱 만들기
const port = 5000; //백엔드 서버가 돌아갈 포트 번호
const dotenv = require("dotenv"); //dotenv 모듈은 환경변수를 .env파일에 저장하고 process.env로 로드하는 의존성 모듈이다.
const connectDB = require("./config/db");

dotenv.config(); //환경변수 설정하기
//Node.js는 .env의 정체를 모른다. dotenv.config()는 프로젝트 폴더에서 .evn파일을 찾고 그 파일을 열어서 Mongo_URI를 읽어서 Node.js가 실행중인 메모리 (process.env)에 집어넣는다.

connectDB(); //DB연결한다.

//간단한 라우트(주소) 만들기
app.get("/", (req, res) => {
  res.send("성공! 백엔드 서바가 작동 중입니다.");
});

//5.서버 실행하기
app.listen(port, () => {
  console.log(`Example app listen ${port}`);
});
