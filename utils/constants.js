const allowedCors = [
  'http://movies.kharisova.nomoredomainsmonster.ru',
  'https://movies.kharisova.nomoredomainsmonster.ru',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const STATUS_CODE_CREATE = 201;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_FORBIDDEN = 403;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_CONFLICT_ERROR = 409;
const STATUS_CODE_ERROR_HANDLER = 500;

const UNAUTHORIZED_MESSAGE_ERROR_AUTH = 'Необходима авторизация.';
const UNAUTHORIZED_MESSAGE_ERROR_USER = 'Введен неправильный логин или пароль.';
const VALIDATION_MESSAGE_ERROR_CREATE_MOVIES = 'Переданы некорректные данные при создании фильма.';
const VALIDATION_MESSAGE_ERROR_PATCH_USER = 'Переданы некорректные данные при обновлении пользователя.';
const VALIDATION_MESSAGE_ERROR_CREATE_USER = 'Переданы некорректные данные при создании пользователя.';
const CONFLICT_MESSAGE_ERROR = 'Пользователь уже существует.';
const NOT_FOUND_MESSAGE_ERROR_USER = 'Пользователь с таким id не найден.';
const NOT_FOUND_MESSAGE_ERROR_DELETE_MOVIE = 'Передан несуществующий id фильма.';
const NOT_FOUND_MESSAGE_ERROR_MOVIES = 'Нет сохраненных фильмов пользователя.';
const CAST_MESSAGE_ERROR_MOVIE = 'Передан некорректный id при удалении фильма.';
const FORBIDDEN_MESSAGE_MOVIE = 'Отсутствуют права на удаление фильма.';
module.exports = {
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  STATUS_CODE_CREATE,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CONFLICT_ERROR,
  STATUS_CODE_ERROR_HANDLER,
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE_ERROR_AUTH,
  UNAUTHORIZED_MESSAGE_ERROR_USER,
  VALIDATION_MESSAGE_ERROR_CREATE_MOVIES,
  VALIDATION_MESSAGE_ERROR_PATCH_USER,
  VALIDATION_MESSAGE_ERROR_CREATE_USER,
  CONFLICT_MESSAGE_ERROR,
  NOT_FOUND_MESSAGE_ERROR_USER,
  NOT_FOUND_MESSAGE_ERROR_DELETE_MOVIE,
  NOT_FOUND_MESSAGE_ERROR_MOVIES,
  CAST_MESSAGE_ERROR_MOVIE,
  FORBIDDEN_MESSAGE_MOVIE,
};
