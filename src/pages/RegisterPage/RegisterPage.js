import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewUser } from 'redux/auth/auth-options';
import authActions from 'redux/auth/auth-actions';
import Form from 'components/Form';

import style from './RegisterPage.module.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    dispatch(authActions.errorClear());
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }
    if (username === '' || email === '' || password === '') {
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
      postNewUser({
        name: username,
        email: email,
        password: password,
      })
    );

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={style.container}>
      <Form
        submitForm={submitForm}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
      />

      <div className={style.coment}>
        <p className={style.comentText}>Who are you warrior?</p>
      </div>

      <div className={style.decor}></div>
    </div>
  );
};
export default RegisterPage;
