const jwt = require('jsonwebtoken');

const secret_key = 'sdfghgfdasdfghjhtrewqwertyuytrewqaxcvbhuytrewsxcvhytrewasxcvghytrewsxcvbhytrewsxcvghytrewazxcvgtrewazxcvghytrewasxcg'


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secret_key);
    req.user = decoded;
  } 
  catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
}

function checkRole(roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('You do not have the required permissions');
    }
    next();
  };
}

module.exports = {
  verifyToken,
  checkRole,
};
