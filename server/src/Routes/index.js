const {Router} = require('express');
const users = require('./UsersRoutes/UsersRoutes.js');
const preguntas = require('./PreguntasRoutes/PreguntasRoutes.js');
const respuestas = require('./RespuestasRoutes/RespuestasRoutes.js');
const votaciones = require('./VotacionesRoutes/VotacionesRoutes.js');
const auth = require('./AuthRoutes/authRoutes.js');
const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/preguntas', preguntas);
router.use('/respuestas', respuestas);
router.use('/votaciones', votaciones);

module.exports = router;
