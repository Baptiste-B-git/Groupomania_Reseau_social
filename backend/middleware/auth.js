const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } 
    else {
      req.userId=userId
      next();
    }
  } catch (err){
    console.log(err);
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
// middleware is admin