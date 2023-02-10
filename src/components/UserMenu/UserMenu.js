import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from 'redux/auth/auth-options';
import { IconContext } from 'react-icons';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Tooltip } from '@mui/material';
import style from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const email = useSelector(state => state.auth.user.email);

  const logOut = e => {
    e.preventDefault();

    dispatch(postLogout());
  };
  return (
    <div className={style.container}>
      {isLoggedIn ? (
        <p className={style.email}>{email}</p>
      ) : (
        <p className={style.email}>Welcome!</p>
      )}

      {isLoggedIn && (
        <Tooltip title="Log out" arrow>
          <button className={style.logoutBtn} onClick={logOut}>
            <IconContext.Provider
              value={{ size: '40px', color: 'rgb(211, 65, 65)' }}
            >
              <IconContext.Provider
                value={{ size: '35px', color: 'rgb(44, 32, 2)' }}
              >
                <RiLogoutBoxRLine />
              </IconContext.Provider>
            </IconContext.Provider>
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default UserMenu;
