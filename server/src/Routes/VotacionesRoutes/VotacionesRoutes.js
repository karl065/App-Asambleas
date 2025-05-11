import { Router } from 'express';
import putHandlerVotaciones from '../../Handlers/HandlersVotaciones/PutHandlerVotaciones.js';

const router = Router();

router.put('/', putHandlerVotaciones);

export default router;
