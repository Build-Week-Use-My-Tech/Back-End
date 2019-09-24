const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      console.log("DECODED TOKEN", decodedToken);
      if (err) {
        // token expired or is invalid
        res.status(401).json({ message: "You are not authorized" });
      } else {
        // token is goooood
        req.email = decodedToken.email;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
