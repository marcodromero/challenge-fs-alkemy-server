const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({
        msg: "Invalid token - user does not exist",
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "Invalid token - user with state: false",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
