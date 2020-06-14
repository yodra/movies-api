import * as express from 'express';
import * as morgan from 'morgan';
import { connect } from "mongoose";
import * as moviesRouter from './api/movies';

const app = express();
const errorHandler = (error, request, response, next) => {
  if (!error) {
    return next();
  }
  response.status(500).send(error);
};

app.use(morgan('combined'));
app.use(express.json());
app.use('/movies', moviesRouter);

app.get('/', (request: express.Request, response: express.Response) => {
  response.json({ message: 'Welcome to MoviesAPI' });
});

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler);
}

connect('mongodb://database:27017/movies');
app.listen(3000, () => {
  console.log('Ready on port 3000!');
});
