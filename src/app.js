const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const HttpStatus = require('http-status-codes');
const morgan = require('morgan');

const logRequests = require('./middleware/log').loggers.get('requests');
const logErrors = require('./middleware/log').loggers.get('errors');
const checkAuthorization = require('./middleware/auth');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  logRequests.info(
    `REQUEST: url: ${JSON.stringify(req.url)} params: ${JSON.stringify(
      req.params
    )} body: ${JSON.stringify(req.body)}`
  );
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', checkAuthorization, userRouter);
app.use('/boards', checkAuthorization, boardRouter);
app.use('/boards/:boardId/tasks', checkAuthorization, taskRouter);

// eslint-disable-next-line
app.use((err, req, res, next) => {
  logErrors.error(`ERRORS: ${JSON.stringify(err.message)}`);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
});

module.exports = app;
