const mongoose = require("mongoose");

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

const User = mongoose.model("User");
