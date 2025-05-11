import deleteHandlerPreguntas from '../../Handlers/HandlersPreguntas/DeletePreguntasHandler.js';
import getHandlerPreguntas from '../../Handlers/HandlersPreguntas/GetPreguntasHandler.js';
import postHandlerPreguntas from '../../Handlers/HandlersPreguntas/PostPreguntasHandler.js';
import putHandlerPreguntas from '../../Handlers/HandlersPreguntas/PutHandlerPreguntas.js';

import { Router } from 'express';

const router = Router();

router.post('/', postHandlerPreguntas);
router.get('/', getHandlerPreguntas);
router.put('/:id', putHandlerPreguntas);
router.delete('/:id', deleteHandlerPreguntas);

export default router;
