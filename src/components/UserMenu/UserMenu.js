import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from 'redux/auth/auth-options';
import { IconContext } from 'react-icons';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import style from './UserMenu.module.css';
import { Button, Tooltip } from '@mui/material';

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
      {/* {isLoggedIn && <p className={style.email}>dsa</p>} */}
      {isLoggedIn && <p className={style.email}>{email}</p>}

      {isLoggedIn ? (
        <>
          {/* <Button variant="outlined" onClick={logOut}>
            <span style={{ fontSize: '11px' }}>Log Out</span>
            <IconContext.Provider
              value={{ size: '35px', color: 'rgb(25, 118, 210)' }}
            >
              <RiLogoutBoxRLine />
            </IconContext.Provider>
          </Button> */}

          {/* <button onClick={logOut} className={style.logoutBtn}>
            {' '}
            <span style={{ fontSize: '11px' }}>Log Out</span>
            <IconContext.Provider
              value={{ size: '35px', color: 'rgb(44, 32, 2)' }}
            >
              <RiLogoutBoxRLine />
            </IconContext.Provider>
          </button> */}

          <Tooltip title="Log out" arrow>
            <button className={style.logoutBtn} onClick={logOut}>
              <IconContext.Provider
                value={{ size: '40px', color: 'rgb(211, 65, 65)' }}
              >
                {/* <VscChromeClose /> */}
                <IconContext.Provider
                  value={{ size: '35px', color: 'rgb(44, 32, 2)' }}
                >
                  <RiLogoutBoxRLine />
                </IconContext.Provider>
              </IconContext.Provider>
            </button>
          </Tooltip>
        </>
      ) : (
        <div className={style.logoutBtn}></div>
      )}
    </div>
  );
};

export default UserMenu;
