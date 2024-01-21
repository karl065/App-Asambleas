const Usuarios = require('../Models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  putControllerUser,
} = require('../Controllers/ControllersUsers/PutControllerUsers');
const {conectarDB} = require('../config/DB');

const {default: mongoose} = require('mongoose');
const {
  GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB');
const {SECRETA} = process.env;

const authenticateUser = async (documento, password) => {
  try {
    if (documento === 'SuperAdmin') {
      await conectarDB('DBAdmin', ['Preguntas', 'Respuestas', 'Predios']);

      const user = await Usuarios.findOne({documento})
        .populate('respuestas')
        .populate('autorizador')
        .populate('autorizado');

      const passwordValid = await bcryptjs.compare(password, user.password);

      if (!user || !passwordValid) {
        throw new Error('Usuario o email incorrectos');
      }

      let usuarioLogin;
      if (user.autorizador.length !== 0) {
        user.autorizador.map((usuario) => {
          putControllerUser({userStatus: true}, usuario._id);
        });
        usuarioLogin = putControllerUser({userStatus: true}, user._id);
      } else {
        usuarioLogin = putControllerUser({userStatus: true}, user._id);
      }
      const userLogin = await Usuarios.findOne({documento})
        .populate('respuestas')
        .populate('autorizador')
        .populate('autorizado');
      const payload = {
        user: {
          id: userLogin._id,
          role: userLogin.role,
        },
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
              id: userLogin._id,
              documento: userLogin.documento,
              primerNombre: userLogin.primerNombre,
              segundoNombre: userLogin.segundoNombre,
              primerApellido: userLogin.primerApellido,
              segundoApellido: userLogin.segundoApellido,
              correo: userLogin.correo,
              celular: userLogin.celular,
              torreMz: userLogin.torreMz,
              predio: userLogin.predio,
              parqueadero: userLogin.parqueadero,
              coeficiente: userLogin.coeficiente,
              role: userLogin.role,
              status: userLogin.userStatus,
              respuestas: userLogin.respuestas,
              autorizador: userLogin.autorizador,
              autorizado: userLogin.autorizado,
              connectedDB: 'DBAdmin',
            };
            resolve(auth);
          }
        );
      });
    } else {
      await conectarDB('DBAdmin', ['Preguntas', 'Respuestas', 'Predios']);
      const DBs = await GetControllerDB();
      let user;
      let connectedDB;

      for (let i = 1; i < DBs.length; i++) {
        await mongoose.disconnect();
        await conectarDB(DBs[i].nombre, ['DBsAdmin']);
        user = await Usuarios.findOne({documento})
          .populate('respuestas')
          .populate('autorizador')
          .populate('autorizado')
          .populate('predios');

        if (user) {
          connectedDB = DBs[i].nombre;
          break;
        }
      }

      const passwordValid = await bcryptjs.compare(password, user.password);

      if (!user || !passwordValid) {
        throw new Error('Usuario o email incorrectos');
      }

      let usuarioLogin;
      if (user.autorizador.length !== 0) {
        user.autorizador.map((usuario) => {
          putControllerUser({userStatus: true}, usuario._id);
        });
        usuarioLogin = putControllerUser({userStatus: true}, user._id);
      } else {
        usuarioLogin = putControllerUser({userStatus: true}, user._id);
      }
      const userLogin = await Usuarios.findOne({documento})
        .populate('respuestas')
        .populate('autorizador')
        .populate('autorizado');
      const payload = {
        user: {
          id: userLogin._id,
          role: userLogin.role,
        },
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
              id: userLogin._id,
              documento: userLogin.documento,
              primerNombre: userLogin.primerNombre,
              segundoNombre: userLogin.segundoNombre,
              primerApellido: userLogin.primerApellido,
              segundoApellido: userLogin.segundoApellido,
              correo: userLogin.correo,
              celular: userLogin.celular,
              torreMz: userLogin.torreMz,
              predio: userLogin.predio,
              parqueadero: userLogin.parqueadero,
              coeficiente: userLogin.coeficiente,
              role: userLogin.role,
              status: userLogin.userStatus,
              respuestas: userLogin.respuestas,
              autorizador: userLogin.autorizador,
              autorizado: userLogin.autorizado,
              connectedDB: connectedDB,
            };
            resolve(auth);
          }
        );
      });
    }
  } catch (error) {
    throw error.message;
  }
};

module.exports = {authenticateUser};
