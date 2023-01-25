import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { ImAddressBook } from 'react-icons/im';

import UserMenu from 'components/UserMenu';
import style from './Navigation.module.css';

const Navigation = () => {
  const authIsLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className={style.container}>
      <header className={style.navigationHeader}>
        <nav>
          <div className={style.linkContainer}>
            <Link to="/" className={style.link}>
              Home
            </Link>
          </div>

          {authIsLoggedIn ? (
            <div className={style.linkContainer}>
              <Link to="/contacts" className={style.link}>
                contacts
                <IconContext.Provider
                  value={{ size: '30px', color: 'rgb(211, 65, 65)' }}
                >
                  <ImAddressBook />
                </IconContext.Provider>
              </Link>
            </div>
          ) : (
            <>
              <div className={style.linkContainer}>
                <Link to="/register" className={style.link}>
                  register
                </Link>
              </div>
              <div className={style.linkContainer}>
                <Link to="/login" className={style.link}>
                  login
                </Link>
              </div>
            </>
          )}
        </nav>

        <div className={style.userMenuContainer}>
          <UserMenu />
        </div>
      </header>

      <div className={style.content}>
        <Outlet />
      </div>

      {/* <footer className={style.footer}>Это футер</footer>  */}
    </div>
  );
};

export default Navigation;
