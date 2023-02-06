import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import UserMenu from 'components/UserMenu';
import style from './Navigation.module.css';

const Navigation = () => {
  const authIsLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className={style.container}>
      <header className={style.navigationHeader}>
        <nav>
          <Link to="/" className={`${style.linkContainer} ${style.bgcHome}`}>
            Home
          </Link>

          {authIsLoggedIn ? (
            <Link
              to="/contacts"
              className={`${style.linkContainer} ${style.bgcContacts}`}
            >
              Contacts
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className={`${style.linkContainer} ${style.bgcReg}`}
              >
                Register
              </Link>
              <Link
                to="/login"
                className={`${style.linkContainer} ${style.bgcLog}`}
              >
                Login
              </Link>
            </>
          )}
        </nav>

        <UserMenu />
      </header>

      <Outlet />
    </div>
  );
};

export default Navigation;
