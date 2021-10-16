import React, { KeyboardEvent } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

type MovieSearchBarProps = {
  onInputChange: (newValue: string) => void;
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    padding: 5,
    flex: 1,
  },
});

const MovieSearchBar = ({ onInputChange }: MovieSearchBarProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.searchBar}>
        <TextField
          id='outlined-basic'
          label='Search for a movie!'
          variant='outlined'
          fullWidth
          size='small'
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MovieSearchBar;
