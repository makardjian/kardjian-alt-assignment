import { useState, useEffect, useCallback } from 'react';
import { filterMovieDetailsData } from '../components/MovieDetails/filterMovieDetailsKeys';
import { MovieDetailsType } from '../components/MovieDetails/MovieDetails.type';

const API_KEY = process.env.REACT_APP_API_KEY;

export const useMovieDetails = (movieDetailsId: string) => {
    const [movieDetails, setMovieDetails] = useState({} as MovieDetailsType);
    const [detailsDataIsLoading, setDetailsDataIsLoading] = useState(false);

const fetchApiMovieDetails = useCallback(async (movieDetailsId: string) => {
    setDetailsDataIsLoading(true);
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieDetailsId}&type=movie`;
    try {
      const response = await fetch(URL);
      const movieDetails = await response.json();
      const cleanMovieDetails = filterMovieDetailsData(movieDetails);
      setMovieDetails(cleanMovieDetails);
      setDetailsDataIsLoading(false);
    } catch (e) {
      setDetailsDataIsLoading(false);
      console.log({ error: e });
    }
  }, []); 

  useEffect(() => {
    fetchApiMovieDetails(movieDetailsId);
  }, [fetchApiMovieDetails, movieDetailsId])

  return {
    movieDetails,
    detailsDataIsLoading
  }
}

