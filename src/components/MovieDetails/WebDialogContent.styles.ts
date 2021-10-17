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
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  detailsContainer: {
    width: '50%',
    marginRight: '5px',
  },
  posterContainer: {
    marginRight: '20px',
    marginTop: '20px',
  },
  moviePosterImage: {
    width: '300px',
    height: '420px',
    borderRadius: 3,
  },
});
