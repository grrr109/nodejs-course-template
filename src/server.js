const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.error('MongoDB error: ', err));

process.on('uncaughtException', error => {
  console.error(`uncaughtException error: ${error.message}`);
});

process.on('unhandledRejection', error => {
  console.error(`unhandledRejection error: ${error.message}`);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
