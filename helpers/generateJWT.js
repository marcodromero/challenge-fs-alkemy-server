const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        reject("Failed to generate token");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generateJWT,
};
