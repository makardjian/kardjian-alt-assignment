import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { MovieDetailsContext } from '../../../context/MovieDetailsContext';
import type { MovieDetailsType } from '../MovieDetails.type';
import { useStyles, sxStyles } from './WebDialogContent.styles';
import noPosterAvailable from '../../../static/no-poster-available.png';

const WebDialogContent = ({
  keysToRenderInDescription,
}: {
  keysToRenderInDescription: Array<keyof MovieDetailsType>;
}) => {
  const { movieDetails: movie } = useContext(MovieDetailsContext);
  const classes = useStyles();
  return (
    <div className={classes.dialogContent}>
      <div className={classes.detailsContainer}>
        {(keysToRenderInDescription).map(
          (key, index) => {
            return (
              <div key={`${key}-${index}`}>
                <Typography sx={sxStyles.detailsLabel}>{key}</Typography>
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
  );
};

export default WebDialogContent;
