import { MovieDetailsType } from './MovieDetails.type';

const desiredKeys = [
  'Actors',
  'Awards',
  'Country',
  'Director',
  'Genre',
  'Language',
  'Plot',
  'Poster',
  'Released',
  'Runtime',
  'Title',
  'Year',
  'imdbId',
  'imdbRating',
];

const desiredKeysSet = new Set(desiredKeys);
// @ts-ignore
export const filterMovieDetailsData = (apiData: any) => {
  return Object.keys(apiData).reduce((acc: any, key: string) => {
    if (desiredKeysSet.has(key)) {
      acc[key] = apiData[key];
    }
    return acc;
  }, {}) as MovieDetailsType;
};
