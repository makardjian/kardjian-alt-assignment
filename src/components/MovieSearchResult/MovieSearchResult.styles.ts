import { makeStyles } from '@mui/styles';

export const sxStyles = {
  card: {
    my: 3,
  } as const,
  cardActionArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 4,
  } as const,
  moviePoster: {
    width: '150px',
    height: '210px',
    borderRadius: 2,
    mr: 4,
  } as const,
};

export const useStyles = makeStyles({
  titleAndYear: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'start',
    margin: '0px 24px',
  },
});
