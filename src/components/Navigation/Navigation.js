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
          <div className={`${style.linkContainer} ${style.bgcHome}`}>
            <Link to="/" className={style.link}>
              Home
            </Link>
          </div>

          {authIsLoggedIn ? (
            <div className={`${style.linkContainer} ${style.bgcContacts}`}>
              <Link to="/contacts" className={style.link}>
                Contacts
              </Link>
            </div>
          ) : (
            <>
              <div className={`${style.linkContainer} ${style.bgcReg}`}>
                <Link to="/register" className={style.link}>
                  register
                </Link>
              </div>
              <div className={`${style.linkContainer} ${style.bgcLog}`}>
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

      {/* <div className={style.content}> */}
      <Outlet />
      {/* </div> */}

      {/* <footer className={style.footer}>Это футер</footer>  */}
    </div>
  );
};

export default Navigation;
