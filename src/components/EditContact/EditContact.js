import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material';
import { ThemeProvider, TextField, createTheme } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const contacts = useSelector(state => state.phonebook.userContacts);

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
              placeholder="This field can`t be empty"
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
              inputProps={{
                type: 'tel',
                pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
              }}
              placeholder="This field can`t be empty"
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
            ...much better!
          </Button>
          <Button
            sx={{ width: '50%', fontSize: '11px' }}
            onClick={() => onClose()}
            color="error"
          >
            ...although no!
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default EditContact;
