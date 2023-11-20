const {Router} = require('express');
const users = require('./UsersRoutes/UsersRoutes.js');
const preguntas = require('./PreguntasRoutes/PreguntasRoutes.js');
const respuestas = require('./RespuestasRoutes/RespuestasRoutes.js');
const router = Router();

router.use('/users', users);
router.use('/preguntas', preguntas);
router.use('/respuestas', respuestas);

module.exports = router;
