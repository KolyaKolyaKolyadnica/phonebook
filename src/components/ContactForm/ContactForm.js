import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';
import {
  AiOutlinePlusCircle,
  AiOutlineStop,
  AiOutlinePlus,
} from 'react-icons/ai';

import { postUserContact } from 'redux/phonebook/phonebook-options';
import style from './ContactForm.module.css';

const ContactForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [isClose, setIsClose] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    dispatch(postUserContact({ name, number }));

    setName('');
    setNumber('');

    if (isClose) {
      setIsClose(false);
      onClose();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.additionalSection}>
        <h2 className={style.title}>This card belongs to...</h2>
        <div className={style.btnContainer}>
          <button
            type="button"
            className={`${style.btn} ${style.closeBtn}`}
            onClick={() => onClose()}
          >
            <IconContext.Provider
              value={{ size: '40px', color: 'rgb(211, 65, 65)' }}
            >
              <AiOutlineStop />
            </IconContext.Provider>
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

        <div className={style.btnContainer}>
          <button type="submit" className={`${style.btn} ${style.saveBtn}`}>
            <span>Save and continue</span>
            <IconContext.Provider
              value={{ size: '30px', color: 'rgb(83, 182, 70)' }}
            >
              <AiOutlinePlus />
            </IconContext.Provider>
          </button>

          <div className={style.space}></div>

          <div className={style.test}>
            <button
              type="submit"
              className={`${style.btn} ${style.saveBtn}`}
              onClick={() => setIsClose(true)}
            >
              <span>Save and close</span>
              <IconContext.Provider
                value={{ size: '30px', color: 'rgb(83, 182, 70)' }}
              >
                <AiOutlinePlusCircle />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
