const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const env = process.env

const authMiddleware = (req, res, next) => {
  const token = req.cookies['auth_tokenDoc'];

  if (token) {
    try {
      const decoded = jwt.verify(token, env.secret);
      req.user = decoded; 
      next();
    } catch (err) {
      res.json({ message: "NotCareAuth" });
    }
  } else {
    res.json({ message: "NoToken" });
  }
};

module.exports = authMiddleware;
