import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material';
import { ThemeProvider, TextField, createTheme } from '@mui/material';

import { patchUserContact } from 'redux/phonebook/phonebook-options';
import style from './EditContact.module.css';

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

const EditContact = ({ editedContact, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(editedContact.name);
  const [number, setNumber] = useState(editedContact.number);

  const onSubmit = e => {
    e.preventDefault();

    dispatch(patchUserContact({ id: editedContact.id, name, number }));

    onClose();
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Looks like something needs to be fixed...</h2>

      <form onSubmit={onSubmit} className={style.form}>
        <div className={style.textFieldContainer}>
          <ThemeProvider theme={theme}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              placeholder="This field must not be empty"
              required
              value={name}
              onChange={e => setName(e.currentTarget.value)}
              sx={{
                mb: '10px',
                width: '230px',
                '& .MuiOutlinedInput-input': {
                  color: 'rgb(10, 4, 128)',
                  fontFamily: 'Indie Flower',
                },
              }}
            />
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <TextField
              id="outlined-basic"
              label="Number"
              variant="outlined"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              placeholder="This field must not be empty"
              required
              value={number}
              onChange={e => setNumber(e.currentTarget.value)}
              sx={{
                width: '230px',
                '& .MuiOutlinedInput-input': {
                  color: 'rgb(10, 4, 128)',
                  fontFamily: 'Indie Flower',
                },
              }}
            />
          </ThemeProvider>
        </div>

        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          size="small"
        >
          <Button
            sx={{ width: '50%', fontSize: '11px' }}
            type="submit"
            color="success"
          >
            ...yes, much better now!
          </Button>
          <Button
            sx={{ width: '50%', fontSize: '11px' }}
            onClick={() => onClose()}
            color="error"
          >
            ...although no, it seemed!
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default EditContact;
