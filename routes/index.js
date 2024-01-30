const routerApp = require('express').Router();
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { signUpValidator, signIpValidator } = require('../middlewares/validator');

routerApp.post('/signin', signIpValidator, login);
routerApp.post('/signup', signUpValidator, createUser);

routerApp.use('/users', require('./users'));
routerApp.use('/movies', require('./movies'));

routerApp.all('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = routerApp;
