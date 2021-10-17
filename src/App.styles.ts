import { makeStyles } from '@mui/styles';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    backgroundColor: '#a8cfe4',
    minHeight: '100vh',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginTop: 0,
    padding: 20,
  },
  subHeader: {
    textAlign: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarAndResultsContainer: {
    width: `${isMobile ? '100%' : '40%'}`,
    minWidth: `${isMobile ? 'unset' : '450px'}`,
  },
  paginationContainer: {
    listStyle: 'none',
    padding: 'unset',
    '& li': {
      display: 'inline-block',
    },
    '& a': {
      margin: '5px',
      padding: '10px',
      display: 'inline-block',
      cursor: 'pointer',
      backgroundColor: '#fff',
      border: '1px solid #241e0c',
      borderRadius: '5px',
      minWidth: '1rem',
    },
  },
  pageIsActive: {
    '& a': {
      backgroundColor: '#47ccde',
      color: '#fff',
    },
  },
});

export default useStyles;
