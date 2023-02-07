import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { postLogin } from 'redux/auth/auth-options';
import authActions from 'redux/auth/auth-actions';

import Form from 'components/Form';
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

    toast.error(`${error}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
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
      <Form
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
