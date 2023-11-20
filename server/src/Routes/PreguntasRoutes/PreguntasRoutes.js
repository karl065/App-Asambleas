const {
  deleteHandlerPreguntas,
} = require('../../Handlers/HandlersPreguntas/DeletePreguntasHandler');
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
router.delete('/:id', deleteHandlerPreguntas);

module.exports = router;
