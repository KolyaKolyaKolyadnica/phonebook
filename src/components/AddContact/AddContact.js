import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import isContactUnique from 'utils/isContactUnique';
import { postUserContact } from 'redux/contacts/contacts-options';

import ContactForm from 'components/ContactForm';
import style from './AddContact.module.css';

const AddContact = ({ onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isClose, setIsClose] = useState(false);

  const contacts = useSelector(state => state.contacts.userContacts);

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    setName(name.trim());

    if (isContactUnique(name.trim(), number, contacts)) {
      dispatch(postUserContact({ name, number }));

      setName('');
      setNumber('');
    }

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
