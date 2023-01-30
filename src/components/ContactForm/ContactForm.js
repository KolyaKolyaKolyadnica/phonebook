import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { ThemeProvider, TextField, createTheme } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { postUserContact } from 'redux/phonebook/phonebook-options';
import style from './ContactForm.module.css';

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

const ContactForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [isClose, setIsClose] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    dispatch(postUserContact({ name, number }));

    setName('');
    setNumber('');

    if (isClose) {
      setIsClose(false);
      onClose();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.additionalSection}>
        <h2 className={style.title}>This card belongs to...</h2>

        <Tooltip title="Close" arrow>
          <Button
            variant="text"
            sx={{ border: 'none', color: 'rgb(164, 2, 2)' }}
            onClick={() => onClose()}
          >
            <CancelIcon sx={{ fontSize: 40 }} />
          </Button>
        </Tooltip>
      </div>

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
              onChange={e => setName(e.currentTarget.value)}
              value={name}
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
              onChange={e => setNumber(e.currentTarget.value)}
              value={number}
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
            Save and continue
          </Button>
          <Button
            sx={{ width: '50%', fontSize: '11px' }}
            type="submit"
            onClick={() => setIsClose(true)}
            color="warning"
          >
            Save and close
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default ContactForm;
