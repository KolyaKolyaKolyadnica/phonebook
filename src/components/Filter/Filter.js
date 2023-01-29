import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Input,
  createTheme,
  ThemeProvider,
  TextField,
  FormHelperText,
  FilledInput,
  styled,
} from '@mui/material';

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

// const CssTextField = styled(TextField)({
//   '& label.Mui-focused': {
//     color: 'rgb(10, 4, 128)',
//   },
//   '& .MuiInput-underline:after': {
//     borderBottomColor: 'green',
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       // borderColor: 'red',
//     },
//     '&:hover fieldset': {
//       // borderColor: 'yellow',
//     },
//     '&.Mui-focused fieldset': {
//       // borderColor: 'green',
//       fontFamily: 'Indie Flower',
//     },
//     '& .MuiInputBase-input': {
//       color: 'rgb(10, 4, 128)',
//       fontFamily: 'Indie Flower',
//     },
//   },
// });

function Filter() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setValue('');
    dispatch(phonebookActions.filterByName(''));
  }, []);

  const changeInput = e => {
    setValue(e.target.value);
    dispatch(phonebookActions.filterByName(e.target.value));
  };

  return (
    <div className={style.container}>
      <ThemeProvider theme={theme}>
        <TextField
          id="filled-basic"
          label="Find"
          variant="filled"
          placeholder="Some name..."
          onChange={changeInput}
          sx={{
            /* !!!!! */
            // <label>
            /* !!!!! */

            '& .MuiFormLabel-root': {
              color: 'yellow',
              borderColor: 'yellow',
            }, //
            '& .MuiInputLabel-root': {
              color: 'yellow',
              borderColor: 'yellow',
            }, //
            // '& .MuiInputLabel-formControl': {}, //

            // '& .MuiInputLabel-animated': {}, //

            // '& .MuiInputLabel-shrink': {
            //   color: 'yellow',
            //   borderColor: 'yellow',
            // }, //
            // '& .MuiInputLabel-filled': {
            //   color: 'yellow',
            //   borderColor: 'yellow',
            // }, //
            // '& .MuiFormLabel-colorPrimary': {
            //   color: 'yellow',
            //   borderColor: 'yellow',
            // }, //
            // '& .MuiFormLabel-filled': {
            //   color: 'yellow',
            //   borderColor: 'yellow',
            // }, // !!!!!!!!!!!!!!

            '& .MuiInputLabel-root': {
              color: 'rgb(10, 4, 128)',
            }, //
            // '& .MuiInputLabel-formControl': {
            //   color: 'red',
            //   borderColor: 'red',
            // }, //

            '& .MuiInputLabel-animated': {}, //

            // '& .MuiInputLabel-shrink': {
            //   color: 'red',
            //   borderColor: 'red',
            // }, //
            // '& .MuiInputLabel-filled': {
            //   color: 'red',
            //   borderColor: 'red',
            // }, //
            // '& .MuiFormLabel - root - MuiInputLabel - root': {
            //   color: 'red',
            //   borderColor: 'red',
            // },

            /* !!!!! */
            // <div>
            /* !!!!! */

            // '& .MuiInputBase-root': {
            //   color: 'red',
            //   borderColor: 'red',
            // },
            // '& .MuiFilledInput-root': {
            //   color: 'red',
            //   borderColor: 'red',
            // },
            // '& .MuiFilledInput-underline': {
            //   color: 'red',
            //   borderColor: 'red',
            // },
            // '& .MuiInputBase-colorPrimary': {
            //   color: 'red',
            //   borderColor: 'red',
            // },
            // '& .MuiInputBase-formControl': {
            //   color: 'red',
            //   borderColor: 'red',
            // },
            // '& .MuiInputBase-root-MuiFilledInput-root': {
            //   color: 'red',
            //   borderColor: 'red',
            // },

            /* !!!!! */
            // <input>
            /* !!!!! */

            '&::before .MuiInputBase-input': {},
            '& .MuiFilledInput-input': {
              color: 'rgb(10, 4, 128)',
              fontFamily: 'Indie Flower',
            },
          }}
        />
      </ThemeProvider>

      {/* <CssTextField
        label="Find:"
        id="custom-css-outlined-input"
        placeholder="Some name..."
      /> */}
    </div>
  );
}

export default Filter;

{
  /* <h3 className={style.text}>Find:</h3>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={changeInput}
        className={style.input}
        value={value}
      /> */
}
{
  /* <ThemeProvider theme={theme}>
        <FilledInput
          color="warning"
          variant="outlined"
          onChange={changeInput}
          sx={{
            fontFamily: 'Indie Flower',
          }}
          label="FilleSSSSSSSd"
        >
          <InputLabel>Find:</InputLabel>
        </FilledInput>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <FormControl color="warning" variant="outlined" onChange={changeInput}>
          <InputLabel>Find:</InputLabel>
          <Input
            sx={{
              fontFamily: 'Indie Flower',
              '& .MuiFilledInput-input': {
                color: 'green',
              },
            }}
          />
        </FormControl>
      </ThemeProvider> */
}

// css - fxs7ox - ;
