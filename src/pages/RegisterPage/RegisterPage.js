import {
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
  Input,
  createTheme,
  ThemeProvider,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewUser } from 'redux/auth/auth-options';

import style from './RegisterPage.module.css';

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

const RegisterPage = () => {
  // mui password (start)
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  // mui password (end)

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitForm = e => {
    e.preventDefault();

    dispatch(
      postNewUser({
        name: username,
        email: email,
        password: password,
      })
    );

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      {/* <div className={style.container}> */}
      <form className={style.form} onSubmit={submitForm}>
        <ThemeProvider theme={theme}>
          <FormControl
            color="neutral"
            variant="standard"
            onChange={e => setUsername(e.target.value)}
          >
            <InputLabel>Username:</InputLabel>
            <Input
              sx={{
                fontFamily: 'Indie Flower',
              }}
            />
          </FormControl>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <FormControl
            color="neutral"
            variant="standard"
            onChange={e => setEmail(e.target.value)}
          >
            <InputLabel>Email:</InputLabel>
            <Input
              sx={{
                fontFamily: 'Indie Flower',
              }}
            />
          </FormControl>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <FormControl
            color="neutral"
            variant="standard"
            onChange={e => setPassword(e.target.value)}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password:
            </InputLabel>
            <Input
              sx={{
                fontFamily: 'Indie Flower',
              }}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <Button
            type="submit"
            color="neutral"
            variant="outlined"
            sx={{
              mt: '20px',
            }}
          >
            Sign In
          </Button>
        </ThemeProvider>
      </form>

      <div className={style.coment}>
        <p className={style.comentText}>Who are you warrior?</p>
      </div>

      <div className={style.decor}></div>
      {/* </div> */}
    </>
  );
};
export default RegisterPage;
