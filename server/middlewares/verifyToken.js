import jwt from 'jsonwebtoken'

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['token'];
    console.log("🚀 ~ file: verifyToken.js:19 ~ verifyToken ~ token:", token)
  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
  return next();
};
    

export default verifyToken;


