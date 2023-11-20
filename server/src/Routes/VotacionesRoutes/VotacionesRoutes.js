const {
  putHandlerVotaciones,
} = require('../../Handlers/HandlersVotaciones/PutHandlerVotaciones');

const router = require('express').Router();

router.put('/', putHandlerVotaciones);

module.exports = router;
