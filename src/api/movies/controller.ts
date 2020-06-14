import { Movie } from "./model";

export const getLikes = () => Movie.find({ like: true });
export const getMovie = movieId => Movie.findById(movieId);
export const getMovies = () => Movie.find();
export const newMovie = movie => {
  const movieToCreate = new Movie({ ...movie });
  return movieToCreate.save();
};

export const updateMovie = movie => Movie.findByIdAndUpdate(movie._id, movie);
export const deleteMovie = movieId => Movie.findByIdAndRemove(movieId);
export const setLikeMovie = (movieId, likeValue) => Movie.findByIdAndUpdate(movieId, { like: likeValue });
