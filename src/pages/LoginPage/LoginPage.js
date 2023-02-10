import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { postLogin } from 'redux/auth/auth-options';
import authActions from 'redux/auth/auth-actions';
import EntranceForm from 'components/EntranceForm';
import toastOptions from 'utils/toast-options';

import style from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    if (!error) {
      return;
    }
    if (email === '' || password === '') {
      dispatch(authActions.errorClear());
    }

    toast.error(`${error}`, toastOptions);
  }, [error]);

  const submitForm = e => {
    e.preventDefault();

    dispatch(
      postLogin({
        email,
        password,
      })
    );

    setEmail('');
    setPassword('');
  };

  return (
    <div className={style.container}>
      <EntranceForm
        submitForm={submitForm}
        setEmail={setEmail}
        setPassword={setPassword}
      />

      <div className={style.coment}>
        <p className={style.comentText}>
          If you want to come in -{' '}
          <span className={style.palyanica}>say "palyanytsia"</span>
          <span className={style.nowLogin}>Now only login :{'('}</span>
        </p>
      </div>
      <div className={style.decor}></div>
    </div>
  );
};
export default LoginPage;
