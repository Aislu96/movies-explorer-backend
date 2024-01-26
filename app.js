const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routerApp = require('./routes');
const limiter = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');

require('dotenv').config();

const { PORT, DB_URL } = process.env;
const { DB_URL_DEFAULT, PORT_DEFAULT } = require('./utils/default');

const app = express();

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(helmet());


app.use(cors);

mongoose.connect(DB_URL || DB_URL_DEFAULT);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', limiter);

app.use('/', routerApp);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT || PORT_DEFAULT, () => {
  console.log(`App listening on port ${PORT}`);
});
