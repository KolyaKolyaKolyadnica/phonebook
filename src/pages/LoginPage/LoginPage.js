import {
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  IconButton,
  Input,
  createTheme,
  ThemeProvider,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { postLogin } from 'redux/auth/auth-options';
import style from './LoginPage.module.css';

// 'Permanent Marker', cursive

const theme = createTheme({
  palette: {
    neutral: {
      main: 'rgb(89, 89, 89)',
      // contrastText: 'rgb(0, 0, 0)',
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

  const isFetchCurrentUser = useSelector(
    state => state.auth.isFetchCurrentUser
  );

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
    <div className={style.container}>
      <h1 className={style.title}>Login Page</h1>

      <form className={style.form} onSubmit={submitForm}>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Email:"
            variant="standard"
            onChange={e => setEmail(e.target.value)}
            color="neutral"
          />
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
              // id="standard-adornment-password"
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

        {/* <button className={style.login}>Log In</button> */}
        <ThemeProvider theme={theme}>
          <Button
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
    </div>
  );
};
export default LoginPage;
