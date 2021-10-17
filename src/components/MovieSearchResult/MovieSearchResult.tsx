import React, { useContext } from 'react';
import { Card, CardMedia, CardActionArea, Typography } from '@mui/material';
import noPosterAvailable from '../../static/no-poster-available.png';
import type { MovieSearchResult as MovieSearchResultType } from './MovieSearchResult.type';
import { MovieDetailsContext } from '../../context/MovieDetailsContext';
import { sxStyles, useStyles } from './MovieSearchResult.styles';

const MovieSearchResult = ({ movie }: { movie: MovieSearchResultType }) => {
  const { updateMovieDetailsId, toggleMovieDetails } =
    useContext(MovieDetailsContext);

  const classes = useStyles();

  const onMovieClick = (id: string) => {
    updateMovieDetailsId(id);
    toggleMovieDetails();
  };

  return (
    <Card sx={sxStyles.card} raised>
      <CardActionArea
        onClick={() => onMovieClick(movie.imdbID)}
        sx={sxStyles.cardActionArea}
      >
        <div className={classes.titleAndYear}>
          <div>
            <Typography color='text.secondary'>Title:</Typography>
            <Typography variant='h6'>
              {movie.Title || '[Title Not Found]'}
            </Typography>
          </div>
          <div>
            <Typography color='text.secondary'>Year:</Typography>
            <Typography variant='h6'>
              {movie.Year || '[Release Year Not Found]'}
            </Typography>
          </div>
        </div>
        <CardMedia
          component='img'
          image={movie?.Poster !== 'N/A' ? movie.Poster : noPosterAvailable}
          alt={`${movie.Title} Poster`}
          sx={sxStyles.moviePoster}
        />
      </CardActionArea>
    </Card>
  );
};

export default MovieSearchResult;
