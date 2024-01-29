const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/ForbiddenError');
const {
  STATUS_CODE_CREATE, VALIDATION_MESSAGE_ERROR_CREATE_MOVIES, NOT_FOUND_MESSAGE_ERROR_DELETE_MOVIE,
  CAST_MESSAGE_ERROR_MOVIE, FORBIDDEN_MESSAGE_MOVIE, NOT_FOUND_MESSAGE_ERROR_MOVIES,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const {_id} = req.user;
  Movie.find({owner: _id})
    .orFail()
    .then((movies) => {
      const movie = movies.filter((film) => req.user._id === film.owner.toString());
      return res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(NOT_FOUND_MESSAGE_ERROR_MOVIES));
      }
      return next(err)
    });
};

module.exports.createMovies = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => res.status(STATUS_CODE_CREATE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(VALIDATION_MESSAGE_ERROR_CREATE_MOVIES));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const {movieId} = req.params;
  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        return next(new Forbidden(FORBIDDEN_MESSAGE_MOVIE));
      }
      return Movie.deleteOne(movie)
        .orFail()
        .then(() => res.send({
          message: 'Фильм удалён',
        }));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(NOT_FOUND_MESSAGE_ERROR_DELETE_MOVIE));
      }
      if (err.name === 'CastError') {
        return next(new BadRequest(CAST_MESSAGE_ERROR_MOVIE));
      }
      return next(err);
    });
};
