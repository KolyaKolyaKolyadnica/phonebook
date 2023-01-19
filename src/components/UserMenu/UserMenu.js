import { useDispatch } from 'react-redux';
import { postLogout } from 'redux/auth/auth-options';
import style from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();

  const logOut = e => {
    e.preventDefault();

    dispatch(postLogout());
  };
  return (
    <div className={style.container}>
      <span>Username</span>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default UserMenu;
