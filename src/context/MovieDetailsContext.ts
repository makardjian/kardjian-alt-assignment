import React, { createContext } from 'react';
import type { MovieDetailsType } from '../components/MovieDetails/MovieDetails.type';

export const MovieDetailsContext = createContext({
  updateMovieDetailsId: (id: string) => {},
  toggleMovieDetails: () => {},
  showMovieDetails: false,
  movieDetails: {} as MovieDetailsType,
  detailsDataIsLoading: false,
});
