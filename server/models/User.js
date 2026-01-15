const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //1. 암호화 도구 불러오기
const saltRounds = 10; //암호화 꼬아서 만드는 정도(10)
const userSchema = mongoose.Schema({
  //1. 이름(최대 50자)
  name: {
    type: String,
    maxlength: 50,
  },
  //2. 이메일(공백 제거, 중복 불가)
  email: {
    type: String,
    trim: true, //공백 제거
    unique: 1, //중복 제거
  },

  //3. 비밀번호(최소 5자 이상)
  password: {
    type: String,
    minlength: 5,
  },

  //4. 성(Last name)
  lastname: {
    type: String,
    maxlength: 50,
  },

  //5. 역할 (0:일반 유저, 1)
  role: {
    type: Number,
    default: 0,
  },

  //6. 프로필 이미지(경로 저장)
  image: {
    type: String,
  },

  //7. token(유효성 관리용)
  token: {
    type: String,
  },

  //8. 토큰 유효기간
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
//User를 그냥 주는 게 아니라 {User:User}라는 객체에 담아서 보낸다.
//TMI module.exports = User;로 하면
//users.js에서 const User = ... 가능하다.
