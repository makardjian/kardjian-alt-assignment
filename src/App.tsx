import React, { useState, useEffect } from 'react';
import ReactPagingate from 'react-paginate';
import { Typography } from '@mui/material';
import { MovieDetailsContext } from './context/MovieDetailsContext';
import MovieSearchBar from './components/MovieSearchBar';
import MovieSearchResults from './components/MovieSearchResults/MovieSearchResults';
import MovieDetails from './components/MovieDetails/MovieDetails';
import useStyles from './App.styles';
import type { MovieDetailsType } from './components/MovieDetails/MovieDetails.type';
import { filterMovieDetailsData } from './components/MovieDetails/filterMovieDetailsKeys';

const RESULTS_PER_PAGE = 10;

const App = () => {
  const classes = useStyles();

  // USER INPUT
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // SEARCH RESULTS
  const [shouldFetchSearchResults, setShouldFetchSearchResults] =
    useState(false);
  const [searchDataIsLoading, setSearchDataIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  // MOVIE DETAILS
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [shouldFetchMovieDetails, setShouldFetchMovieDetails] = useState(false);
  const [movieDetailsId, setMovieDetailsId] = useState('');
  const [movieDetails, setMovieDetails] = useState({} as MovieDetailsType);
  const [detailsDataIsLoading, setDetailsDataIsLoading] = useState(false);

  // PAGINATION
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchApiSearchResults = async () => {
    setSearchDataIsLoading(true);
    setShouldFetchSearchResults(false);
    const URL = `http://www.omdbapi.com/?apikey=9bc26618&s=${searchQuery}&type=movie&page=${currentPage}`;
    try {
      const response = await fetch(URL);
      const responseData = await response.json();
      const { Search: searchResults = [], totalResults = 1 } = responseData;

      const newPageCount = Math.ceil(Number(totalResults) / RESULTS_PER_PAGE);
      setPageCount(newPageCount);
      setSearchResults(searchResults);
      setSearchDataIsLoading(false);
      if (!searchResults.length) {
        setShowNoResultsMessage(true);
        setPageCount(0);
        setCurrentPage(1);
      }
    } catch (e) {
      console.log({ error: e });
      setSearchDataIsLoading(false);
      setSearchError(true);
      setPageCount(0);
      setCurrentPage(1);
    }
  };

  const fetchApiMovieDetails = async (imdbID: string) => {
    setShouldFetchMovieDetails(false);
    setDetailsDataIsLoading(true);
    const URL = `http://www.omdbapi.com/?apikey=9bc26618&i=${imdbID}&type=movie`;
    try {
      const response = await fetch(URL);
      const movieDetails = await response.json();

      const cleanMovieDetails = filterMovieDetailsData(movieDetails);
      setMovieDetails(cleanMovieDetails);
      setDetailsDataIsLoading(false);
    } catch (e) {
      console.log({ e });
    }
  };

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
    setShouldFetchMovieDetails(true);
  };

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
    setShouldFetchSearchResults(true);
  };

  useEffect(() => {
    if (shouldFetchSearchResults && searchQuery.length) {
      fetchApiSearchResults();
    }
  }, [shouldFetchSearchResults, searchQuery]);

  useEffect(() => {
    if (shouldFetchMovieDetails) {
      fetchApiMovieDetails(movieDetailsId);
    }
  }, [shouldFetchMovieDetails]);

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
            <ReactPagingate
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
