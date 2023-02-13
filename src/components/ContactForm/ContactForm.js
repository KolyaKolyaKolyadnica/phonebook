import { Button, ButtonGroup } from '@mui/material';
import { ThemeProvider, TextField } from '@mui/material';

import theme from 'utils/mui-theme';

import style from './ContactForm.module.css';

const ContactForm = ({
  onSubmit,
  onClose,
  name,
  number,
  setName,
  setNumber,
  setIsClose = null,
}) => {
  return (
    <form onSubmit={onSubmit} className={style.form}>
      <div className={style.textFieldContainer}>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            inputProps={{
              pattern: '^([a-zA-Z0-9_.-]).{1,20}',
            }}
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
            helperText="Should contain from 2 to 20 letters"
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
          sx={{ width: '50%', fontSize: '12px' }}
          type="submit"
          color="success"
        >
          {setIsClose ? 'Save and continue' : '...much better!'}
        </Button>

        {setIsClose ? (
          <Button
            sx={{ width: '50%', fontSize: '12px' }}
            type="submit"
            onClick={() => setIsClose(true)}
            color="warning"
          >
            Save and close
          </Button>
        ) : (
          <Button
            sx={{ width: '50%', fontSize: '12px' }}
            onClick={() => onClose()}
            color="error"
          >
            ...although no
          </Button>
        )}
      </ButtonGroup>
    </form>
  );
};

export default ContactForm;
