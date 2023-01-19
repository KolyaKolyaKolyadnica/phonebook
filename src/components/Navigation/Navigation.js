import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import UserMenu from 'components/UserMenu';
import style from './Navigation.module.css';

const Navigation = () => {
  const authIsLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className={style.container}>
      <header>
        <nav>
          <Link to="/" className={style.link}>
            home
          </Link>

          {authIsLoggedIn ? (
            <>
              <Link to="/contacts" className={style.link}>
                contacts
              </Link>

              <UserMenu />
            </>
          ) : (
            <>
              <Link to="/register" className={style.link}>
                register
              </Link>
              <Link to="/login" className={style.link}>
                login
              </Link>
            </>
          )}
        </nav>
      </header>

      <div className={style.content}>
        <Outlet />
      </div>

      {/* <footer className={style.footer}>Это футер</footer>  */}
    </div>
  );
};

export default Navigation;
