import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPagingate from 'react-paginate';
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
      const response = await axios.get(URL);
      const {
        data: { Search: searchResults = [], totalResults = 1 },
      } = response;
      const newPageCount = Math.ceil(totalResults / RESULTS_PER_PAGE);
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
      const response = await axios.get(URL);
      const { data: movieDetails = {} } = response;
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
      <h1 className={classes.header}>Cinema Center</h1>
      <div className={classes.contentContainer}>
        <div className={classes.searchBarAndResultsContainer}>
          <MovieSearchBar
            value={inputValue}
            onInputChange={onInputChange}
            onSearch={onSearch}
          />
          <MovieSearchResults
            movies={searchResults}
            dataIsLoading={searchDataIsLoading}
            showNoResultsMessage={showNoResultsMessage}
            toggleMovieDetails={onToggleMovieDetails}
            updateMovieDetailsId={onUpdateMovieDetailsId}
            showSearchError={searchError}
          />
          {showMovieDetails && (
            <MovieDetails
              showMovieDetails
              toggleMovieDetails={onToggleMovieDetails}
              movieDetails={movieDetails}
              dataIsLoading={detailsDataIsLoading}
            />
          )}
        </div>
        {searchResults.length && pageCount > 0 ? (
          <ReactPagingate
            previousLabel='prev'
            nextLabel='next'
            breakLabel='...'
            pageCount={pageCount}
            pageRangeDisplayed={4}
            onPageChange={onPageChange}
            containerClassName={classes.paginationContainer}
            activeClassName={classes.pageIsActive}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
