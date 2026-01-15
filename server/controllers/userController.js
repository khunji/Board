const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.getSalt(10);
    const hash = await bcrypt.hash(password, salt);

    req.body.password = hash;

    const user = new User(req.body);
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.json({
      success: false,
      err,
    });
  }
};

module.exports = { register };
