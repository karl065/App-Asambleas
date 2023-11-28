const express = require('express');

const {authMiddle} = require('../../Middleware/authMiddle');
const {
  handlerAuthenticate,
} = require('../../Handlers/HandlerAuth/HandlerAuthenticate');
const {
  handlerAuthenticated,
} = require('../../Handlers/HandlerAuth/HandlerAuthenticated');

const router = express.Router();

router.post('/', handlerAuthenticate);
router.get('/', authMiddle, handlerAuthenticated);

module.exports = router;
