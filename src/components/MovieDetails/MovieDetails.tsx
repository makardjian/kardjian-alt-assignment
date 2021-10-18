import React, { useContext } from 'react';
import {
  Dialog,
  CircularProgress,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Button,
} from '@mui/material';
import { isMobile } from 'react-device-detect';
import WebDialogContent from './WebDialogContent/WebDialogContent';
import MobileDialogContent from './MobileDialogContent/MobileDialogContent';
import { MovieDetailsContext } from '../../context/MovieDetailsContext';
import type { MovieDetailsType } from './MovieDetails.type';
import Colors from '../../Colors';

const backgroundColor = Colors['@eggshell'];

const MovieDetails = () => {
  const {
    showMovieDetails,
    toggleMovieDetails,
    movieDetails: movie,
    detailsDataIsLoading: dataIsLoading,
  } = useContext(MovieDetailsContext);

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
          <DialogTitle
            sx={{
              backgroundColor,
              textAlign: 'center',
              fontSize: '30px',
            }}
          >
            {movie.Title}
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
