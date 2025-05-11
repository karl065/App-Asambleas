import { Router } from 'express';

import users from './UsersRoutes/UsersRoutes.js';
import preguntas from './PreguntasRoutes/PreguntasRoutes.js';
import respuestas from './RespuestasRoutes/RespuestasRoutes.js';
import votaciones from './VotacionesRoutes/VotacionesRoutes.js';
import auth from './AuthRoutes/authRoutes.js';
import DB from './DBRoutes/DBRoutes.js';
import predios from './PrediosRoutes/PrediosRoutes.js';
import temas from './TemasRoutes/TemasRoutes.js';
const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/preguntas', preguntas);
router.use('/respuestas', respuestas);
router.use('/votaciones', votaciones);
router.use('/DB', DB);
router.use('/predios', predios);
router.use('/temas', temas);

export default router;
