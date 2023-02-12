import { ThemeProvider, TextField } from '@mui/material';
import theme from 'utils/mui-theme';

import style from './Filter.module.css';

function Filter({ setFilterValue }) {
  return (
    <div className={style.container}>
      <ThemeProvider theme={theme}>
        <TextField
          id="filled-basic"
          label="Find"
          variant="filled"
          placeholder="Some name..."
          onChange={e => setFilterValue(e.target.value)}
          sx={{
            width: '80%',
            '& .MuiInputLabel-root': {
              color: 'black',
            },
            '& .MuiFilledInput-input': {
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
