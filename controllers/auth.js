const { googleVerify } = require("../helpers/google-verify");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    const user = await User.findOne({ email });

    //user does not exist
    if (!user) {
      user = await User.create({ name, picture, email });
      await user.save();
    }

    //user exist
    if (!user.state) {
      return res.json({ msg: "User blocked by administrator" });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "the token could not be verified.",
    });
  }
};

module.exports = {
  googleSignIn,
};
