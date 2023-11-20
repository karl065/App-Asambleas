const express = require('express');
const router = require('./Routes');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());

// Cross-Origin-Opener-Policy configuration
server.use(
  helmet.crossOriginOpenerPolicy({
    policy: 'same-origin-allow-popups',
  })
);

server.use(cors());

server.use(router);

module.exports = server;
