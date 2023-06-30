const { checkToken } = require('../utils/jwtAuth');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(3);
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = checkToken(token);
    req.user = {
      _id: payload._id,
    };
    console.log(4);
    return next();
  } catch (err) {
    console.log(5);
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }
};

module.exports = {
  auth,
};
