const jwt = require('jsonwebtoken');
const {SECRETA} = process.env;

const authMiddle = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(400).json({msg: 'No hay token'});
  }
  try {
    const decoded = jwt.verify(token, SECRETA);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(400).json({msg: 'Token no valido'});
  }
};

module.exports = {authMiddle};
