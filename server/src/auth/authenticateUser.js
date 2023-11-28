const {Usuarios, Respuestas} = require('../DB.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  putControllerUser,
} = require('../Controllers/ControllersUsers/PutControllerUsers.js');
const {Op} = require('sequelize');
const {SECRETA} = process.env;

const authenticateUser = async (documento, password) => {
  try {
    console.log(documento);
    const user = await Usuarios.findOne({
      where: {documento: {[Op.iLike]: `%${documento}%`}},
      include: [
        {
          model: Respuestas,
          as: 'respuestas',
        },
        {
          model: Usuarios,
          attributes: {exclude: ['password']},
          as: 'autorizador', // Incluye el usuario autorizador
        },
        {
          model: Usuarios,
          attributes: {exclude: ['password']},
          as: 'autorizados', // Incluye los usuarios autorizados
        },
      ],
    });
    const passwordValid = await bcryptjs.compare(password, user.password);

    if (!user || !passwordValid) {
      throw new Error('Usuario o email incorrectos');
    }
    let usuarioLogin;
    if (user.autorizador.length !== 0) {
      user.autorizador.map((usuario) => {
        putControllerUser({userStatus: true}, usuario.idUser);
      });
      usuarioLogin = putControllerUser({userStatus: true}, user.idUser);
    } else {
      usuarioLogin = putControllerUser({userStatus: true}, user.idUser);
    }

    const payload = {
      user: {id: usuarioLogin.idUser},
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        SECRETA,
        {
          expiresIn: '1d',
        },
        (err, token) => {
          if (err) {
            reject({msg: 'Error al crear el Token'});
          }
          const auth = {
            token,
            id: user.idUser,
            documento: user.documento,
            primerNombre: user.primerNombre,
            segundoNombre: user.segundoNombre,
            primerApellido: user.primerApellido,
            segundoApellido: user.segundoApellido,
            correo: user.correo,
            celular: user.celular,
            torreMz: user.torreMz,
            predio: user.predio,
            parqueadero: user.parqueadero,
            coeficiente: user.coeficiente,
            role: user.role,
            status: user.userStatus,
            respuestas: user.respuestas,
            autorizador: user.autorizador,
            autorizados: user.autorizados,
          };
          resolve(auth);
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {authenticateUser};
