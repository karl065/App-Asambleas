import deleteHandlerRespuestas from '../../Handlers/HandlersRespuestas/DeleteHandlerRespuestas.js';
import postHandlerRespuestas from '../../Handlers/HandlersRespuestas/PostRespuestasHandler.js';
import putHandlerRespuestas from '../../Handlers/HandlersRespuestas/PutHandlerRespuestas.js';
import getHandleRespuestas from '../../Handlers/HandlersRespuestas/GetHandlerRespuestas.js';

import { Router } from 'express';

const router = Router();

router.post('/', postHandlerRespuestas);
router.get('/', getHandleRespuestas);
router.put('/:id', putHandlerRespuestas);
router.delete('/:id', deleteHandlerRespuestas);

export default router;
