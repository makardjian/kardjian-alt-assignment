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
import { makeStyles } from '@mui/styles';
import { isMobile } from 'react-device-detect';
import WebDialogContent from './WebDialogContent/WebDialogContent';
import MobileDialogContent from './MobileDialogContent/MobileDialogContent';
import { MovieDetailsContext } from '../../context/MovieDetailsContext';
import type { MovieDetailsType } from './MovieDetails.type';
import Colors from '../../Colors';

const useStyles = makeStyles({
  movieTitle: {
    textAlign: 'center',
    fontSize: '30px',
  },
});

const backgroundColor = Colors['@eggshell'];

const MovieDetails = () => {
  const {
    showMovieDetails,
    toggleMovieDetails,
    movieDetails: movie,
    detailsDataIsLoading: dataIsLoading,
  } = useContext(MovieDetailsContext);

  const classes = useStyles();

  const keysToRenderInDescription = Object.keys(movie).filter((key) => {
    return key !== 'Poster' && key !== 'Title';
  }) as Array<keyof MovieDetailsType>;

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
          <DialogTitle sx={{ backgroundColor }}>
            <Typography className={classes.movieTitle} variant='h5'>
              {movie.Title}
            </Typography>
          </DialogTitle>
          <Divider variant='middle' />
          <DialogContent sx={{ backgroundColor }}>
            {isMobile ? (
              <MobileDialogContent
                keysToRenderInDescription={keysToRenderInDescription}
              />
            ) : (
              <WebDialogContent
                keysToRenderInDescription={keysToRenderInDescription}
              />
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor }}>
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
