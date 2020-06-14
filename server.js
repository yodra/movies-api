const express = require('express');
const app = express();

let movies = [
    { id: '1', name: 'Matrix' },
    { id: '2', name: 'Star Wars' }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello world' });
});

app.get('/movies/like', (request, response) => {
    const likeMovies = movies.filter(movie => movie.like === true);
    response.json(likeMovies);
});

app.get('/movies/:id', (request, response) => {
    const movieId = request.params.id;
    const movie = movies.find(movie => movie.id === movieId);
    response.json(movie);
});

app.get('/movies', (request, response) => {
    response.json(movies);
});

app.post('/movies', (request, response) => {
    const movie = request.body;
    movie.id = `${movies.length + 1}`;
    movies.push(movie);
    response.json(movies);
});

app.put('/movies', (request, response) => {
    const movieId = request.body.id;
    let moviePosition = movies.findIndex(movie => movie.id === movieId);
    if (moviePosition >= 0) {
        movies[moviePosition] = request.body;
    }
    response.json(movies);
});

app.delete('/movies/:id', (request, response) => {
    const movieId = request.params.id;
    const moviePosition = movies.findIndex(movie => movie.id === movieId);
    if (moviePosition >= 0) {
        movies.splice(moviePosition, 1);
    }
    response.json(movies);
});

app.post('/movies/like/:id', (request, response) => {
    const movieId = request.params.id;
    const movie = movies.find(movie => movie.id === movieId);
    if (movie) {
        movie.like = true;
    }
    response.json(movies);
});

app.delete('/movies/like/:id', (request, response) => {
    const movieId = request.params.id;
    const movie = movies.find(movie => movie.id === movieId);
    if (movie) {
        movie.like = false;
    }
    response.json(movies);
});

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});
