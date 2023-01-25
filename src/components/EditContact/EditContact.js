import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchUserContact } from 'redux/phonebook/phonebook-options';
import style from './EditContact.module.css';

const EditContact = ({ editedContact, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(editedContact.name);
  const [number, setNumber] = useState(editedContact.number);

  const onSubmit = e => {
    e.preventDefault();

    dispatch(patchUserContact({ id: editedContact.id, name, number }));

    onClose();
  };

  return (
    <div className={style.container}>
      <div className={style.additionalSection}>
        <h2 className={style.title}>
          Looks like something needs to be fixed...
        </h2>
        <div className={style.btnContainer}>
          <button
            type="button"
            className={`${style.btn} ${style.closeBtn}`}
            onClick={() => onClose()}
          >
            ...although no, I thought :{')'}
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className={style.form}>
        <div>
          <p className={style.text}>Name</p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={e => setName(e.currentTarget.value)}
            value={name}
            className={style.input}
          />
        </div>

        <div>
          <p className={style.text}>Number</p>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={e => setNumber(e.currentTarget.value)}
            value={number}
            className={style.input}
          />
        </div>

        <button type="submit">...yes, much better now!</button>
      </form>
    </div>
  );
};

export default EditContact;
