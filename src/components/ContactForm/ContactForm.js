import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { ThemeProvider, TextField, createTheme } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const contacts = useSelector(state => state.phonebook.userContacts);

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    let uniqueName = true;
    for (let i = 0; i < contacts.length; i += 1) {
      if (contacts[i].name === name) {
        uniqueName = false;
        break;
      }
    }

    if (!uniqueName) {
      toast.warning(`This name already exists`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      return;
    }

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
              placeholder="This field can`t be empty"
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
              inputProps={{
                type: 'tel',
                pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
              }}
              placeholder="This field can`t be empty"
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
              helperText="Format: 123-456-7890"
            />
          </ThemeProvider>
        </div>

        <ButtonGroup
          variant="contained"
          aria-label="contained primary button group"
          size="small"
          sx={{ width: '80%' }}
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
