import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider, TextField } from '@mui/material';

import phonebookActions from 'redux/phonebook/phonebook-actions';
import style from './Filter.module.css';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'Permanent Marker',
      'Indie Flower',
    ].join(','),
  },
  palette: {
    neutral: {
      main: 'rgb(70, 70, 70)',
    },
  },
});

function Filter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(phonebookActions.filterByName(''));
  }, []);

  return (
    <div className={style.container}>
      <ThemeProvider theme={theme}>
        <TextField
          id="filled-basic"
          label="Find"
          variant="filled"
          placeholder="Some name..."
          onChange={e =>
            dispatch(phonebookActions.filterByName(e.target.value))
          }
          sx={{
            width: '80%',
            '& .MuiInputLabel-root': {
              color: 'black',
            },
            '& .MuiFilledInput-input': {
              // color: 'rgb(10, 4, 128)',
              color: 'rgb(25, 118, 210)',
              fontFamily: 'Indie Flower',
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default Filter;
