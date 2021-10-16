import React, { useContext } from 'react';
import {
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
} from '@mui/material';
import noPosterAvailable from '../../static/no-poster-available.png';
import type { MovieSearchResult as MovieSearchResultType } from './MovieSearchResult.type';
import { MovieDetailsContext } from '../../context/MovieDetailsContext';

const sxStyles = {
  card: {
    my: 3,
  } as const,
  cardActionArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 4,
  } as const,
  titleAndYear: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'start',
    ml: 4,
  } as const,
  moviePoster: {
    width: '150px',
    height: '210px',
    borderRadius: 2,
    mr: 4,
  } as const,
};

const MovieSearchResult = ({ movie }: { movie: MovieSearchResultType }) => {
  const { updateMovieDetailsId, toggleMovieDetails } =
    useContext(MovieDetailsContext);

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
        <Box sx={sxStyles.titleAndYear}>
          <Box>
            <Typography color='text.secondary'>Title:</Typography>
            <Typography variant='h6'>
              {movie.Title || '[Title Not Found]'}
            </Typography>
          </Box>
          <Box>
            <Typography color='text.secondary'>Year:</Typography>
            <Typography variant='h6'>
              {movie.Year || '[Release Year Not Found]'}
            </Typography>
          </Box>
        </Box>
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
