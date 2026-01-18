//회원가입 기능 구현
const express = require("express");
const router = express.Router();

//컨트롤러 불러오기
const userController = require("../controllers/userController");

//auth미들웨어 가져오기(인증)
const { auth } = require("../middleware/auth");

// 회원가입 라우트
router.post("/register", userController.register);

// 로그인 라우트
router.post("/login", userController.login);

//인증(Auth)
router.get("/", auth, userController.auth);

module.exports = router;
