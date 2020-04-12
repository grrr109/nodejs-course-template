const { PORT } = require('./common/config');
const app = require('./app');

process.on('uncaughtException', error => {
  console.error(`uncaughtException error: ${error.message}`);
});

process.on('unhandledRejection', error => {
  console.error(`unhandledRejection error: ${error.message}`);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
