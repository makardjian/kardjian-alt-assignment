import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Typography } from '@mui/material';
import { MovieDetailsContext } from './context/MovieDetailsContext';
import MovieSearchBar from './components/MovieSearchBar';
import MovieSearchResults from './components/MovieSearchResults/MovieSearchResults';
import MovieDetails from './components/MovieDetails/MovieDetails';
import useStyles from './App.styles';
import { useSearchResults } from './hooks/useSearchResults';
import { useMovieDetails } from './hooks/useMovieDetails';

const App = () => {
  const classes = useStyles();

  console.log('hello App');
  // COMMON 
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [shouldFetchSearchResults, setShouldFetchSearchResults] = useState(false);

  // USER INPUT
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // MOVIE DETAILS
  const [movieDetailsId, setMovieDetailsId] = useState('');
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const {
    searchDataIsLoading,
    searchResults,
    pageCount
  } = useSearchResults({searchQuery, currentPage, shouldFetchSearchResults, setShowNoResultsMessage, setSearchError});


  const {
    movieDetails,
    detailsDataIsLoading
  } = useMovieDetails(movieDetailsId)

  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
    setShowNoResultsMessage(false);
    setSearchError(false);
  };

  const onSearch = () => {
    setCurrentPage(1);
    setSearchQuery(inputValue);
    setShouldFetchSearchResults(true);
  };

  const onToggleMovieDetails = () => {
    setShowMovieDetails(!showMovieDetails);
  };

  const onUpdateMovieDetailsId = (id: string) => {
    setMovieDetailsId(id);
  };

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
    setShouldFetchSearchResults(true);
  };


  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.header}>
        Cinema Center
      </Typography>
      <div className={classes.contentContainer}>
        <div className={classes.searchBarAndResultsContainer}>
          <MovieSearchBar
            value={inputValue}
            onInputChange={onInputChange}
            onSearch={onSearch}
          />
          <MovieDetailsContext.Provider
            value={{
              toggleMovieDetails: onToggleMovieDetails,
              updateMovieDetailsId: onUpdateMovieDetailsId,
              showMovieDetails,
              movieDetails,
              detailsDataIsLoading,
            }}
          >
            <MovieSearchResults
              movies={searchResults}
              dataIsLoading={searchDataIsLoading}
              showNoResultsMessage={showNoResultsMessage}
              showSearchError={searchError}
            />
            {showMovieDetails && <MovieDetails />}
          </MovieDetailsContext.Provider>
          {searchResults.length && pageCount > 0 ? (
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={4}
              marginPagesDisplayed={2}
              onPageChange={onPageChange}
              containerClassName={classes.paginationContainer}
              activeClassName={classes.pageIsActive}
              previousLabel='&larr;'
              nextLabel='&rarr;'
              breakLabel='...'
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
