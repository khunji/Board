//회원가입 기능 구현
const express = require("express");
const router = express.Router();
const { User } = require("../models/User"); //{User}로 감싼 이유는 User.js에서 {}형태로 감싸서-->User모델 불러오기
const bcrypt = require("bcrypt"); //1.암호화 도구를 부른다.

router.post("/register", async (req, res) => {
  //1. 클라이언트가 보내준 회원 가입 정보를 가져온다.-->(req.body)에 담김
  const user = new User(req.body); //가장 중요: DB에 저장할 수 있는 객체 형태로 변신!, req.body에는 유저의 정보(raw 데이터)가 담겨 있다.

  try {
    //2.클라이언트가 보낸 비밀번호를 꺼낸다.
    const { password } = req.body;

    //3. 암호화(Salt 생성->해싱)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //4. 요청 데이터(req.body)의 비밀번호를 암호문으로 바꿔치기하자.
    req.body.password = hash;

    //5. 이제 안전해진 데이터로 유저를 생성하고 저장하자.
    const user = new User(req.body);

    await user.save(); //여기서 DB에 저장한다.

    return res.status(200).json({
      sucess: true,
    });
  } catch (err) {
    return res.json({
      sucess: false,
      err,
    });
  }
});

module.exports = router;
