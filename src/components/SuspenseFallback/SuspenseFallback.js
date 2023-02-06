import { CircularProgress, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import style from './SuspenseFallback.module.css';

const SuspenseFallback = () => {
  const authIsLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <div className={style.container}>
      <header className={style.navigationHeader}>
        <p className={`${style.linkContainer} ${style.bgcHome}`}>Home</p>

        {authIsLoggedIn ? (
          <p className={`${style.linkContainer} ${style.bgcContacts}`}>
            Contacts
          </p>
        ) : (
          <>
            <p className={`${style.linkContainer} ${style.bgcHome}`}>
              Register
            </p>
            <p className={`${style.linkContainer} ${style.bgcContacts}`}>
              Login
            </p>
          </>
        )}
      </header>

      <div className={style.folder}>
        Loading
        <div className={style.linearProgress}>
          <LinearProgress color="inherit" />
        </div>
      </div>
    </div>
  );
};

export default SuspenseFallback;
