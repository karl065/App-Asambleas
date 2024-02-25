const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  putControllerUser,
} = require('../Controllers/ControllersUsers/PutControllerUsers');
const {conectarDB} = require('../config/DB');

const {
  GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB');
const {SECRETA} = process.env;

const authenticateUser = async (documento, password) => {
  try {
    const dbConnection = await conectarDB('DBAdmin');
    let user;
    let connectedDB;
    let usuarioLogin;
    const DBs = await GetControllerDB(dbConnection);
    if (documento === 'SuperAdmin' || documento === 'View') {
      const Usuarios = dbConnection.model('Usuarios');
      user = await Usuarios.findOne({documento});

      const passwordValid = await bcryptjs.compare(password, user.password);

      if (!user || !passwordValid) {
        throw new Error('Usuario o Contraseña incorrectos');
      }

      const userLogin = await Usuarios.findOne({documento});
      const payload = {
        user: {
          id: userLogin._id,
          role: userLogin.role,
          connectedDB: 'DBAdmin',
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
              _id: userLogin._id,
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
              connectedDB: 'DBAdmin',
            };
            resolve(auth);
          }
        );
      });
    } else {
      let Usuarios;
      let dbConnection;
      for (const db of DBs.slice(1)) {
        dbConnection = await conectarDB(db.nombre);
        Usuarios = dbConnection.model('Usuarios');
        user = await Usuarios.findOne({documento})
          .populate('respuestas')
          .populate('autorizador')
          .populate('autorizado')
          .populate('predios');

        if (user) {
          connectedDB = db.nombre;
          break;
        }
      }
      if (user.userStatus) throw new Error('El usuario ya esta en asamblea');
      const passwordValid = await bcryptjs.compare(password, user.password);

      if (!user || !passwordValid) {
        throw new Error('Documento o Contraseña incorrectos');
      }

      if (user.autorizador.length !== 0) {
        user.autorizador.map((usuario) => {
          putControllerUser(dbConnection, {userStatus: true}, usuario._id);
        });
        usuarioLogin = putControllerUser(
          dbConnection,
          {userStatus: true},
          user._id
        );
      } else {
        usuarioLogin = putControllerUser(
          dbConnection,
          {userStatus: true},
          user._id
        );
      }
      const userLogin = await Usuarios.findOne({documento})
        .populate('respuestas')
        .populate('autorizador')
        .populate('autorizado');
      const payload = {
        user: {
          id: userLogin._id,
          role: userLogin.role,
          connectedDB: connectedDB,
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
              _id: userLogin._id,
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
