import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import phonebookActions from 'redux/phonebook/phonebook-actions';
import style from './Filter.module.css';

function Filter() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setValue('');
    dispatch(phonebookActions.filterByName(''));
  }, []);

  const changeInput = e => {
    setValue(e.target.value);
    dispatch(phonebookActions.filterByName(e.target.value));
  };

  return (
    <div className={style.container}>
      <h3 className={style.text}>Find:</h3>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={changeInput}
        className={style.input}
        value={value}
      />
    </div>
  );
}

export default Filter;
