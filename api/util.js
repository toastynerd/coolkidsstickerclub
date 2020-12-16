const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET || 'devsecretsshhhhhh';

function getUserId(context) {
  const Authorization = context.req.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId
  } 

  throw new Error('Not Authenticated');
};

module.exports = {
  APP_SECRET,
  getUserId,
};
