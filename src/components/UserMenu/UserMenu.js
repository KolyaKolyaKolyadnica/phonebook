import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from 'redux/auth/auth-options';
import { IconContext } from 'react-icons';
import { RiLogoutBoxRLine } from 'react-icons/ri';
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
    <>
      {isLoggedIn ? (
        <p className={style.email}>{email}</p>
      ) : (
        <p className={style.email}>Welcome!</p>
      )}

      {isLoggedIn ? (
        <button onClick={logOut} className={style.logoutBtn}>
          <IconContext.Provider
            value={{ size: '35px', color: 'rgb(44, 32, 2)' }}
          >
            <RiLogoutBoxRLine />
          </IconContext.Provider>
        </button>
      ) : (
        <div className={style.logoutBtn}></div>
      )}
    </>
  );
};

export default UserMenu;
