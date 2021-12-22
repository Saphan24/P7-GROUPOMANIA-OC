const jwt = require('jsonwebtoken');
require('dotenv').config(); // permet de cacher le MDP sur le dépôt

module.exports = {
    userId: function (req) {
      const token = req.headers.authorization.split(' ')[1]; 
      const { userId } = jwt.verify(token, process.env.TKN); 
      return userId;
    },
    isAdmin: function (req) {
      const { isAdmin } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TKN); 
      return isAdmin;
    },
  };