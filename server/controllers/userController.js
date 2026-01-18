const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); //토큰을 만드는 기구

//회원가입 로직
const register = async (req, res) => {
  try {
    //비밀번호 DB에 암호화
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    req.body.password = hash;

    const user = new User(req.body);
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("회원가입 에러 발생", err);
    res.json({
      success: false,
      err,
    });
  }
};

//로그인 로직
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    //해당되는 이메일이 없는 경우
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //해당되는 이메일이 있는 경우
    //비밀번호 비교하기(bcrypt를 사용하기)
    //예시 : req.body.password:사용자가 입력한 비번->12345
    //user.password = DB에 있는 암호문(외계어)
    //일치하면 isMatch에는 True가 할당되고 일치하지 않으면 isMatch에는 False가 할당된다.
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    //토큰 생성(jwt를 직접 사용하자.)
    //user._id + "secretToken"=>토큰 생성
    //toHexString()쓴 이유 : _id는 문자열이 아니라 사실 ObjectId라는 특수한 객체이다.
    //하지만 우리가 필요한 값:(순수한 문자열)
    //몽고디비 전용 객체(이진 데이터)를 넣기보다 문자열(16진수)로 변환하는게 맞다.
    const token = jwt.sign(user._id.toHexString(), "secretToken");

    //생성된 토큰을 유저 데이터에 넣고 저장.
    user.token = token;
    await user.save();

    //쿠키에 담아서 응답
    //x_auth:쿠키의 이름(key), user.token:쿠키의 내용물
    res
      .cookie("x_auth", user.token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//인증 로직
const auth = (req, res) => {
  //미들웨어(auth.js)를 통과함
  //미들웨어가 찾아놓은 req.user정보를 꺼내서 보여주는 역할만 한다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //DB에는 0이 저장되어 있다.(일반 유저) 그러나 req.user.role이 0이면 false(관라지 아님)주고 1이면 true(관리자임)
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
};

module.exports = { register, login, auth };
