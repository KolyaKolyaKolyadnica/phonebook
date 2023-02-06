import {
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
  Input,
  ThemeProvider,
  Button,
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewUser } from 'redux/auth/auth-options';
import authActions from 'redux/auth/auth-actions';
import theme from 'utils/mui-theme';

import style from './RegisterPage.module.css';

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

  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    dispatch(authActions.errorClear());
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }
    if (username === '' || email === '' || password === '') {
      dispatch(authActions.errorClear());
    }

    toast.error(`${error}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }, [error]);

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
    <div className={style.container}>
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
            <FormHelperText id="component-helper-text">
              This is your life, enter whatever you want
            </FormHelperText>
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
              inputProps={{
                pattern: '^([a-zA-Z0-9_.-]+)@([a-z0-9_.-]+).([a-z.]{2,6})$',
              }}
              type="email"
            />
            <FormHelperText id="component-helper-text">
              Latin letters/numbers/symbols, one @-symbol, one or more dot
            </FormHelperText>
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
              inputProps={{
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ws]).{6,}',
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
            <FormHelperText id="component-helper-text">
              Min 6 any symbols. Required 'a-z', 'A-Z', '0-9'
            </FormHelperText>
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
    </div>
  );
};
export default RegisterPage;