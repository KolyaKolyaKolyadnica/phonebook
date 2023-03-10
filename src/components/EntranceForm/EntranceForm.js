import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
  Input,
  ThemeProvider,
  Button,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import theme from 'utils/mui-theme';
import isBtnDisable from 'utils/isBtnDisable';
import style from './EntranceForm.module.css';

const EntranceForm = ({
  submitForm,
  setUsername = null,
  setEmail,
  setPassword,
}) => {
  // mui password (start)
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  // mui password (end)

  const isFetchCurrentUser = useSelector(
    state => state.auth.isFetchCurrentUser
  );

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPas = useRef(null);

  return (
    <form className={style.form} onSubmit={submitForm}>
      {setUsername && (
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
              ref={refName}
            />
            <FormHelperText id="component-helper-text">
              This is your life, enter whatever you want
            </FormHelperText>
          </FormControl>
        </ThemeProvider>
      )}

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
            ref={refEmail}
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
            autoComplete="off"
            sx={{
              fontFamily: 'Indie Flower',
            }}
            inputProps={{
              pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ws]).{6,}',
            }}
            type={showPassword ? 'text' : 'password'}
            ref={refPas}
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
          disabled={
            setUsername
              ? isBtnDisable(refEmail, refPas, refName)
              : isBtnDisable(refEmail, refPas)
          }
        >
          {isFetchCurrentUser ? (
            <CircularProgress style={{ width: '25px', height: '25px' }} />
          ) : setUsername ? (
            'Sign In'
          ) : (
            'Log in'
          )}
        </Button>
      </ThemeProvider>
    </form>
  );
};

export default EntranceForm;
