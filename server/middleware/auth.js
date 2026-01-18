const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //1. 쿠키에서 토큰을 꺼낸다.
  //클라이언트가 요청을 보낼 때 쿠키에 'x_auth'라는 이름으로 토큰을 담아 보냄.
  const token = req.cookies.x_auth;

  //2. 토큰이 아예 없을 때
  //return을 해서 다음 단계(next)로 안 넘어간다.
  if (!token) {
    return res.json({ isAuth: false, error: true });
  }

  //3. 토큰 있을 때-->진짜인지 해독(verify)
  //암호 해독기:jwt.verify사용법
  //jwt.verify(검사할 토큰, 비밀키, 결과콜백함수)
  jwt.verify(token, "secretToken", async (err, decoded) => {
    //err가 있으면 : 토큰이 유효기간이 지났거나, 해커가 조작한 토큰이다.
    if (err) return res.json({ isAuth: false, error: true });

    //4.유저 찾자
    //decoded : 토큰을 풀어서 나온 유저 아이디(user._id)
    //DB에서 1)아이디가 맞고, 2)DB에도 그 토큰이 저장되어 있는지 확인한다.
    try {
      const user = await User.findOne({ _id: decoded, token: token });

      //유저가 DB에 없으면?(회원 탈퇴했거나, 로그아웃해서 토큰 지워진 상태)
      if (!user) {
        return res.json({ isAuth: false, error: true });
      }

      //5. *핵심* 정보 넘겨주기
      //req에 정보를 넣는 이유:
      //이 auth 미들웨어를 통과한 뒤에 실행할 함수(Controller)에서도
      //"아, 이 요청을 보낸 사람이 이 유저"알 수 있게 해준다.

      req.token = token;
      req.user = user;

      next(); //-->다음에 오는게 Controller.js인지는 어떻게 아는 걸까?
      //바로 라우터(routes/users.js)에 있다.
      //router.get("/auth", auth, userController.auth);
      //auth : 쉼표(,)를 기준으로 앞에 있으니 먼저 실행하고 거기서 next()라고 외치면 바로 뒤에 있는 userController를 실행
    } catch (error) {
      return res.json({ isAuth: false, error: true });
    }
  });
};

module.exports = { auth };
