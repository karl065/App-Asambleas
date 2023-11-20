const {
  getHandlerPreguntas,
} = require('../../Handlers/HandlersPreguntas/GetPreguntasHandler');
const {
  postHandlerPreguntas,
} = require('../../Handlers/HandlersPreguntas/PostPreguntasHandler');
const {
  putHandlerPreguntas,
} = require('../../Handlers/HandlersPreguntas/PutHandlerPreguntas');

const router = require('express').Router();

router.post('/', postHandlerPreguntas);
router.get('/', getHandlerPreguntas);
router.put('/:id', putHandlerPreguntas);

module.exports = router;
