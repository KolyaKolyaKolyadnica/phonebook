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
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { postLogin } from 'redux/auth/auth-options';
import style from './LoginPage.module.css';

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

const LoginPage = () => {
  // mui password (start)
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  // mui password (end)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitForm = e => {
    e.preventDefault();

    dispatch(
      postLogin({
        email,
        password,
      })
    );

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <form className={style.form} onSubmit={submitForm}>
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
            Log In
          </Button>
        </ThemeProvider>
      </form>
      <div className={style.coment}>
        <p className={style.comentText}>
          If you want to come in -{' '}
          <span className={style.palyanica}>say "palyanytsia"</span>
          <br></br>
          <span className={style.nowLogin}>Now only login :{'('}</span>
          <span className={style.nowLogin2}></span>
        </p>
      </div>
      <div className={style.decor}></div>
    </>
  );
};
export default LoginPage;
