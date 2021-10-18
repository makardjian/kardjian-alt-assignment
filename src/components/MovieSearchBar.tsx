import React, { KeyboardEvent } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

type MovieSearchBarProps = {
  value: string;
  onInputChange: (newValue: string) => void;
  onSearch: () => void;
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

const MovieSearchBar = ({
  value,
  onInputChange,
  onSearch,
}: MovieSearchBarProps) => {
  const classes = useStyles();

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.searchBar}>
        <TextField
          id='outlined-basic'
          label='Search for a movie!'
          variant='outlined'
          autoComplete='off'
          size='small'
          fullWidth
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => onKeyPress(e)}
        />
      </div>
      <Button variant='contained' size='medium' onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieSearchBar;
