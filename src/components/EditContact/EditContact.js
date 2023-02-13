import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import isContactUnique from 'js/isContactUnique';
import { patchUserContact } from 'redux/phonebook/phonebook-options';
import ContactForm from 'components/ContactForm';
import style from './EditContact.module.css';

const EditContact = ({ editedContact, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(editedContact.name);
  const [number, setNumber] = useState(editedContact.number);

  const contacts = useSelector(state => state.phonebook.userContacts);

  const onSubmit = e => {
    e.preventDefault();

    if (!isContactUnique(name, number, contacts)) {
      return;
    }

    dispatch(patchUserContact({ id: editedContact.id, name, number }));

    onClose();
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Looks like something needs to be fixed...</h2>

      <ContactForm
        onSubmit={onSubmit}
        onClose={onClose}
        name={name}
        number={number}
        setName={setName}
        setNumber={setNumber}
        type="edit"
      />
    </div>
  );
};

export default EditContact;
