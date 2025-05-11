import getHandlerDB from '../../Handlers/HandlerDB/GetHandlerDB.js';
import conexionDB from '../../Handlers/HandlerDB/HandlerConexionDB.js';
import postHandlerDB from '../../Handlers/HandlerDB/PostHandlerDB.js';
import authMiddle from '../../Middleware/authMiddle.js';

import { Router } from 'express';

const router = Router();

router.post('/', authMiddle, postHandlerDB);
router.post('/conexion', authMiddle, conexionDB);
router.get('/', authMiddle, getHandlerDB);

export default router;
