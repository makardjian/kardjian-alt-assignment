import React from 'react';
import { CircularProgress, Alert, AlertTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MovieSearchResult from '../MovieSearchResult/MovieSearchResult';
import NoMovieResults from './NoMovieResults';
import type { MovieSearchResult as MovieSearchResultType } from '../MovieSearchResult/MovieSearchResult.type';
import { API_ERROR_MESSAGE } from './ApiError.constants';

type MovieSearchResultsProps = {
  movies: MovieSearchResultType[];
  dataIsLoading: boolean;
  showNoResultsMessage: boolean;
  showSearchError: boolean;
};

const useStyles = makeStyles({
  alertContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  alertMessage: {
    width: '75%',
  },
});

const MovieSearchResults = ({
  movies,
  dataIsLoading,
  showNoResultsMessage,
  showSearchError,
}: MovieSearchResultsProps) => {
  const classes = useStyles();
  return (
    <>
      {dataIsLoading ? (
        <CircularProgress sx={{ py: 5 }} />
      ) : showNoResultsMessage ? (
        <NoMovieResults />
      ) : showSearchError ? (
        <div className={classes.alertContainer}>
          <Alert className={classes.alertMessage} severity='error'>
            <AlertTitle>Error</AlertTitle>
            {API_ERROR_MESSAGE}
          </Alert>
        </div>
      ) : (
        movies.map((movie) => (
          <MovieSearchResult movie={movie} key={movie.imdbID} />
        ))
      )}
    </>
  );
};

export default MovieSearchResults;
