const winston = require('winston');

const requestsOptions = {
  file: {
    level: 'info',
    timestamp: true,
    json: false,
    filename: 'logs/requests.log',
    maxfiles: 10,
    maxsize: 209715200
  },
  console: {
    level: 'info',
    colorize: true
  }
};

winston.loggers.add('requests', {
  format: winston.format.simple(),
  transports: [
    new winston.transports.File(requestsOptions.file),
    new winston.transports.Console(requestsOptions.console)
  ]
});

const errorsOptions = {
  file: {
    level: 'info',
    timestamp: true,
    json: false,
    filename: 'logs/errors.log',
    maxfiles: 10,
    maxsize: 209715200
  },
  console: {
    level: 'info',
    colorize: true
  }
};

winston.loggers.add('errors', {
  format: winston.format.simple(),
  transports: [
    new winston.transports.File(errorsOptions.file),
    new winston.transports.Console(errorsOptions.console)
  ]
});

module.exports = winston;
