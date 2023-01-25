import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postLogin } from 'redux/auth/auth-options';
import style from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const isFetchCurrentUser = useSelector(
    state => state.auth.isFetchCurrentUser
  );

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

  const changeInput = e => {
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

        <button className={style.login}>Log In</button>
      </form>

      <div className={style.coment}>
        <p className={style.comentText}>
          If you want to come in -{' '}
          <span className={style.palyanica}>say "palyanytsia"</span>
          <br></br>
          <span className={style.nowLogin}>Now only login :{'('}</span>
          <span className={style.nowLogin2}></span>
        </p>
      </div>

      <div className={style.decor}></div>
    </div>
  );
};
export default LoginPage;
