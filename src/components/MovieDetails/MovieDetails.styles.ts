import { makeStyles } from '@mui/styles';

export const sxStyles = {
  dialogContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 3,
  } as const,
  movieTitle: {
    textAlign: 'center',
    fontSize: '30px',
  } as const,
  detailsContainer: {
    width: '60%',
    mr: 3,
  } as const,
  detailsLabel: {
    fontWeight: 600,
    fontSize: '18px',
  } as const,
  posterContainer: {
    mr: 5,
    mb: 5,
  } as const,
  dialogActions: {
    marginTop: -6,
    padding: 2,
  } as const,
};

export const useStyles = makeStyles({
  moviePosterImage: {
    width: '300px',
    height: '420px',
    borderRadius: 3,
  },
});
