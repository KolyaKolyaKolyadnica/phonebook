import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IconContext } from 'react-icons';
import { VscChromeClose } from 'react-icons/vsc';
import { GrEdit } from 'react-icons/gr';

import { Tooltip } from '@mui/material';

import {
  getUserContacts,
  deleteUserContact,
} from 'redux/phonebook/phonebook-options';
import EditContact from '../EditContact';
import Modal from 'components/Modal';
import Brace from 'components/Brace';

import style from './ContactList.module.css';

const STEP = 115;

function ContactList() {
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState(null);
  const [sheetHeight, setSheetHeight] = useState(null);

  const dispatch = useDispatch();
  const refList = createRef();
  const refContainer = createRef();

  useEffect(() => {
    dispatch(getUserContacts());
  }, [dispatch]);

  const contacts = useSelector(state => state.phonebook.userContacts);
  const filterValue = useSelector(state => state.phonebook.filter);

  const visibleContacts =
    filterValue === ''
      ? contacts
      : contacts.filter(contact => contact.name.includes(filterValue));

  useEffect(() => {
    const containerHeight = refContainer.current.getBoundingClientRect().height;

    console.log(Math.floor(containerHeight / STEP));

    Math.floor(containerHeight / (STEP + 15)) !== 0
      ? setSheetHeight(Math.floor(containerHeight / STEP))
      : setSheetHeight(3);
  }, [refContainer, visibleContacts, filterValue]);

  const editContact = (id, name, number) => {
    setShowModal(true);

    setEditedContact({ id, name, number });
  };

  const contactsListItems = visibleContacts.map(contact => {
    return (
      <li key={contact.id} className={style.listItem}>
        <div className={style.listItem__infoBlock}>
          <p className={style.contact}>{contact.name}:</p>
          <p className={style.contact}>{contact.number}</p>
        </div>

        <div className={style.listItem__buttonBlock}>
          <Tooltip title="Edit" arrow>
            <button
              className={style.btn}
              value={contact.id}
              onClick={() =>
                editContact(contact.id, contact.name, contact.number)
              }
            >
              <IconContext.Provider
                value={{ size: '30px', color: 'rgb(1, 65, 65)' }}
              >
                <GrEdit />
              </IconContext.Provider>
            </button>
          </Tooltip>

          <Tooltip title="Delete" arrow>
            <button
              className={style.btn}
              value={contact.id}
              onClick={() => dispatch(deleteUserContact(contact.id))}
            >
              <IconContext.Provider
                value={{ size: '40px', color: 'rgb(211, 65, 65)' }}
              >
                <VscChromeClose />
              </IconContext.Provider>
            </button>
          </Tooltip>
        </div>
      </li>
    );
  });

  return (
    <>
      <div className={style.refContainer} ref={refContainer}>
        {visibleContacts.length === 0 ? (
          <>
            <Brace number={sheetHeight} step={STEP} />
            <div className={style.notFound}>
              <p className={style.p1}>No such people have been found.</p>
              <p className={style.p2}>Maybe try something else?</p>
              <p className={style.p3}>
                Or is it a <span>sign</span> that it's time to
                <span>make new friends</span> :D
              </p>
            </div>
          </>
        ) : (
          <>
            <Brace number={sheetHeight} step={STEP} />
            <ul className={style.list} ref={refList}>
              {contactsListItems}
            </ul>
          </>
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(!showModal)}>
          <EditContact
            editedContact={editedContact}
            onClose={() => setShowModal(!showModal)}
          />
        </Modal>
      )}
    </>
  );
}

export default ContactList;
