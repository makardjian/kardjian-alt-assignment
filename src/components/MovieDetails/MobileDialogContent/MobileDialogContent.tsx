import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { MovieDetailsContext } from '../../../context/MovieDetailsContext';
import type { MovieDetailsType } from '../MovieDetails.type';
import { useStyles, sxStyles } from './MobileDialogContent.styles';
import noPosterAvailable from '../../../static/no-poster-available.png';

const MobileDialogContent = ({
  keysToRenderInDescription,
}: {
  keysToRenderInDescription: Array<keyof MovieDetailsType>;
}) => {
  const { movieDetails: movie } = useContext(MovieDetailsContext);
  const classes = useStyles();
  return (
    <div className={classes.dialogContent}>
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
      <div>
        {(keysToRenderInDescription as Array<keyof typeof movie>).map(
          (key: keyof MovieDetailsType, index: number) => {
            return (
              <div key={`${key}-${index}`}>
                <Typography sx={sxStyles.detailsLabel}>{key}</Typography>
                <Typography>{movie[key]}</Typography>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default MobileDialogContent;
