import { useState, useCallback, useEffect } from 'react';
import { UseSearchResults } from './useSearchResults.type';

const API_KEY = process.env.REACT_APP_API_KEY;
const RESULTS_PER_PAGE = 10;

export const useSearchResults = ({searchQuery, currentPage, shouldFetchSearchResults, setShowNoResultsMessage, setSearchError }: UseSearchResults) => {
  const [searchDataIsLoading, setSearchDataIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const fetchApiSearchResults = useCallback(async () => {
    setSearchDataIsLoading(true);
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&type=movie&page=${currentPage}`;
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
      }
    } catch (e) {
      console.log({ error: e });
      setSearchDataIsLoading(false);
      setSearchError(true);
      setPageCount(0);
    }
  }, [searchQuery, currentPage, setSearchError, ]);

  useEffect(() => {
    if (shouldFetchSearchResults && searchQuery.length) {
      fetchApiSearchResults();
    }
  }, [shouldFetchSearchResults, searchQuery, fetchApiSearchResults, setShowNoResultsMessage]);


  return {
    searchDataIsLoading,
    searchResults,
    pageCount
  };
};
