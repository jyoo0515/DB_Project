const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const token = jwt.sign({ userId: user.userId, name: user.name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "4h",
  });
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.cookies["access_token"];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
    if (err) return res.status(403);

    req.user = authData;
    next();
  });
};

const verify = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const auth = { generateToken, verifyToken, verify };
module.exports = auth;
