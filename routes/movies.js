const router = require('express').Router();
const { getMovies, createMovies, deleteMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');
const { moviesValidator, movieIdValidator } = require('../middlewares/validator');

router.get('/', getMovies);
router.post('/', moviesValidator, auth, createMovies);

router.delete('/:movieId', movieIdValidator, auth, deleteMovie);

module.exports = router;
