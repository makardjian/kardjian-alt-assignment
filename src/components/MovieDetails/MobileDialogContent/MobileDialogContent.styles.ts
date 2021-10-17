import { makeStyles } from '@mui/styles';

export const sxStyles = {
  detailsLabel: {
    fontWeight: 600,
    fontSize: '18px',
  } as const,
};

export const useStyles = makeStyles({
  dialogContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  posterContainer: {
    margin: '10px 0px',
  },
  moviePosterImage: {
    width: '240px',
    height: '336px',
    borderRadius: 3,
  },
});
