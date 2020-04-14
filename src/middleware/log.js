const winston = require('winston');

const format = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

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
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    format
  ),
  transports: [
    new winston.transports.File(requestsOptions.file),
    new winston.transports.Console(requestsOptions.console)
  ]
});

const errorsOptions = {
  file: {
    level: 'error',
    timestamp: true,
    json: false,
    filename: 'logs/errors.log',
    maxfiles: 10,
    maxsize: 209715200
  },
  console: {
    level: 'error',
    colorize: true
  }
};

winston.loggers.add('errors', {
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    format
  ),
  transports: [
    new winston.transports.File(errorsOptions.file),
    new winston.transports.Console(errorsOptions.console)
  ]
});

module.exports = winston;
