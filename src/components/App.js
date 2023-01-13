import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getContacts } from '../redux/phonebook/phonebook-options';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import style from './App.module.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <>
      <div className={style.container}>
        <div className={style.menu}>
          <h1>Phonebook</h1>

          <ContactForm />

          <Filter />
        </div>

        <div className={style.contacts}>
          <h2>Contacts</h2>

          <ContactList />
        </div>
      </div>
    </>
  );
}

export default App;
