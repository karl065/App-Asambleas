const {authenticateUser} = require('../../auth/authenticateUser');
const {socket} = require('../../socket/socket');

const handlerAuthenticate = async (req, res) => {
  try {
    const {documento, password} = req.body;
    const token = await authenticateUser(documento, password);

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

module.exports = {handlerAuthenticate};
