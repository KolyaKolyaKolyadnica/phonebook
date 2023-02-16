import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { postNewUser } from 'redux/auth/auth-options';
import EntranceForm from 'components/EntranceForm';
import toastOptions from 'utils/toast-options';

import style from './RegisterPage.module.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    if (error) toast.error(`${error}`, toastOptions);
  }, [dispatch, error]);

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
      <EntranceForm
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
