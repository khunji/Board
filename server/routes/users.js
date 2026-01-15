//회원가입 기능 구현
const express = require("express");
const router = express.Router();

//1. 컨트롤러 불러오기
const userController = require("../controllers/userControllers");

//2. 회원가입 라우트
router.post("/register", userController.register);

module.exports = router;
