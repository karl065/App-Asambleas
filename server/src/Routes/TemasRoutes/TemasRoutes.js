import deleteHandlerTemas from '../../Handlers/HandlerTemas/DeleteTemasHandler.js';
import getHandlerTemas from '../../Handlers/HandlerTemas/GetTemasHandler.js';
import postHandlerTemas from '../../Handlers/HandlerTemas/PostTemasHandler.js';
import putHandlerTemas from '../../Handlers/HandlerTemas/PutTemasHandler.js';

import { Router } from 'express';

const router = Router();

router.post('/', postHandlerTemas);
router.delete('/:id', deleteHandlerTemas);
router.put('/:id', putHandlerTemas);
router.get('/', getHandlerTemas);

export default router;
