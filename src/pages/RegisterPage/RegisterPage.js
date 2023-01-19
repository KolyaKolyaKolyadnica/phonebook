import { useState } from 'react';
import { useDispatch } from 'react-redux';

import authActions from '../../redux/auth/auth-actions';
import { postNewUser } from 'redux/auth/auth-options';

import style from './RegisterPage.module.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitForm = e => {
    e.preventDefault();

    dispatch(
      postNewUser({
        name: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );

    setUsername('');
    setEmail('');
    setPassword('');
  };

  const changeInput = e => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }

    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={submitForm}>
        <input
          className={style.text}
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={changeInput}
        />
        <span>username</span>

        <input
          className={style.email}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={changeInput}
        />
        <span>email</span>

        <input
          className={style.input}
          type="password"
          name="password"
          placeholder="password"
          autoComplete="on"
          value={password}
          onChange={changeInput}
        />
        <span>password</span>

        <button className={style.signin}>Sign In</button>
      </form>
    </div>
  );
};
export default RegisterPage;
