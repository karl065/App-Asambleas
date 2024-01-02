const {getHandlerDB} = require('../../Handlers/HandlerDB/GetHandlerDB');
const {conexionDB} = require('../../Handlers/HandlerDB/HandlerConexionDB');
const {postHandlerDB} = require('../../Handlers/HandlerDB/PostHandlerDB');
const {authMiddle} = require('../../Middleware/authMiddle');

const router = require('express').Router();

router.post('/', authMiddle, postHandlerDB);
router.post('/conexion', authMiddle, conexionDB);
router.get('/', authMiddle, getHandlerDB);

module.exports = router;
