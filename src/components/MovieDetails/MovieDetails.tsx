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
import { isMobile } from 'react-device-detect';
import { WebDialogContent } from './WebDialogContent';
import { MovieDetailsContext } from '../../context/MovieDetailsContext';
import { useStyles } from './MovieDetails.styles';

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
            {isMobile ? (
              <div> hello world</div>
            ) : (
              <WebDialogContent
                keysToRenderInDescription={keysToRenderInDescription}
              />
            )}
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
