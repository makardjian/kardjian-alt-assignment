import React, { useContext } from 'react';
import {
  Dialog,
  Typography,
  CircularProgress,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Button,
} from '@mui/material';
import type { MovieDetailsType } from './MovieDetails.type';
import { MovieDetailsContext } from '../../context/MovieDetailsContext';
import noPosterAvailable from '../../static/no-poster-available.png';
import { useStyles, sxStyles } from './MovieDetails.styles';

const MovieDetails = () => {
  const {
    showMovieDetails,
    toggleMovieDetails,
    movieDetails: movie,
    detailsDataIsLoading: dataIsLoading,
  } = useContext(MovieDetailsContext);

  const keysToRenderInDescription = Object.keys(movie).filter((key) => {
    return key !== 'Poster' && key !== 'Title';
  });

  const classes = useStyles();

  return (
    <>
      {dataIsLoading ? (
        <CircularProgress />
      ) : (
        <Dialog
          open={showMovieDetails}
          onClose={toggleMovieDetails}
          maxWidth='md'
        >
          <DialogTitle>
            <Typography className={classes.movieTitle} variant='h5'>
              {movie.Title}
            </Typography>
          </DialogTitle>
          <Divider variant='middle' />
          <DialogContent>
            <div className={classes.dialogContent}>
              <div className={classes.detailsContainer}>
                {(keysToRenderInDescription as Array<keyof typeof movie>).map(
                  (key: keyof MovieDetailsType, index: number) => {
                    return (
                      <div key={`${key}-${index}`}>
                        <Typography sx={sxStyles.detailsLabel}>
                          {key}
                        </Typography>
                        <Typography>{movie[key]}</Typography>
                      </div>
                    );
                  }
                )}
              </div>
              <div className={classes.posterContainer}>
                <img
                  className={classes.moviePosterImage}
                  alt={`${movie.Title} Poster`}
                  src={
                    movie.Poster && movie.Poster !== 'N/A'
                      ? movie.Poster
                      : noPosterAvailable
                  }
                ></img>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleMovieDetails} variant='outlined'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default MovieDetails;
