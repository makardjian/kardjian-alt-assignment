import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import noResultsCameraMan from '../../static/no-results-camera-man.png';

const useStyles = makeStyles({
  image: {
    backgroundColor: 'transparent',
    width: '50%',
    height: '50%',
  },
});

const NoMovieResults = () => {
  const classes = useStyles();
  return (
    <div>
      <img
        className={classes.image}
        src={noResultsCameraMan}
        alt='No Results'
      ></img>
      <Typography variant='h6'>
        Oh no! We couldn't find any results for that search.
      </Typography>
      <Typography variant='h6'>Please try again.</Typography>
    </div>
  );
};

export default NoMovieResults;
