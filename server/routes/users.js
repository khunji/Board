//회원가입 기능 구현
const express = require("express");
const router = express.Router();

//1. 컨트롤러 불러오기
const userController = require("../controllers/userController");

//2. 회원가입 라우트
router.post("/register", userController.register);

//3. 로그인 라우트
router.post("/login", userController.login);

module.exports = router;
