import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import isContactUnique from 'js/isContactUnique';
import { postUserContact } from 'redux/phonebook/phonebook-options';

import ContactForm from 'components/ContactForm';
import style from './AddContact.module.css';

const AddContact = ({ onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isClose, setIsClose] = useState(false);

  const contacts = useSelector(state => state.phonebook.userContacts);

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    setName(name.trim());
    console.log('___' + name.trim() + '___');

    // if (!isContactNameValid(name)) return;
    if (!isContactUnique(name, number, contacts)) return;

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

        <Tooltip title="Close" arrow>
          <Button
            variant="text"
            sx={{ border: 'none', color: 'rgb(164, 2, 2)' }}
            onClick={() => onClose()}
          >
            <CancelIcon sx={{ fontSize: 40 }} />
          </Button>
        </Tooltip>
      </div>

      <ContactForm
        onSubmit={onSubmit}
        onClose={onClose}
        name={name}
        number={number}
        setName={setName}
        setNumber={setNumber}
        setIsClose={setIsClose}
      />
    </div>
  );
};

export default AddContact;
