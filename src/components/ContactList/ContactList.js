import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IconContext } from 'react-icons';
import { VscChromeClose } from 'react-icons/vsc';
import { GrEdit } from 'react-icons/gr';

import { CircularProgress, Tooltip } from '@mui/material';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  getUserContacts,
  deleteUserContact,
} from 'redux/phonebook/phonebook-options';
import EditContact from '../EditContact';
import Modal from 'components/Modal';
import Brace from 'components/Brace';

import style from './ContactList.module.css';
import phonebookActions from 'redux/phonebook/phonebook-actions';

function ContactList({ filterValue }) {
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState(null);
  const [sheetHeight, setSheetHeight] = useState(null);

  const dispatch = useDispatch();
  const refContainer = createRef();

  const contactsIsLoading = useSelector(
    state => state.phonebook.userContactsLoading
  );
  const contacts = useSelector(state => state.phonebook.userContacts);
  const userContactsError = useSelector(
    state => state.phonebook.userContactsError
  );

  useEffect(() => {
    dispatch(getUserContacts());
  }, [dispatch]);

  useEffect(() => {
    if (userContactsError) {
      toast.error(`${userContactsError}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }

    dispatch(phonebookActions.clearError());
  }, [userContactsError]);

  const visibleContacts =
    filterValue === ''
      ? contacts
      : contacts.filter(contact => contact.name.includes(filterValue));

  useEffect(() => {
    const containerHeight = refContainer.current.getBoundingClientRect().height;
    const step = 115;

    Math.floor(containerHeight / (step + 15)) > 3
      ? setSheetHeight(Math.floor(containerHeight / step))
      : setSheetHeight(3);
  }, [refContainer, visibleContacts, filterValue]);

  useEffect(() => {
    if (contacts.length === 1) {
      toast.success(`${contacts.length} contact successfully loaded`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    if (contacts.length > 1) {
      toast.success(`${contacts.length} contacts successfully loaded`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [dispatch]);

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

  const zeroContacts = (
    <div className={style.notFound}>
      <p className={style.p1}>No contacts have been saved yet</p>
      <p className={style.p2}>Time to fix it</p>
      <p className={style.p3}>
        Click on the <span>folder icon</span> at the top of the sheet
      </p>
    </div>
  );
  const zeroVisibleContacts = (
    <div className={style.notFound}>
      <p className={style.p1}>No such people have been found.</p>
      <p className={style.p2}>Maybe try something else?</p>
      <p className={style.p3}>
        Or is it a <span>sign</span> that it's time to
        <span>make new friends</span> :D
      </p>
    </div>
  );

  return (
    <>
      <div className={style.refContainer} ref={refContainer}>
        {contactsIsLoading ? (
          <div className={style.loadContainer}>
            <Brace number={sheetHeight} />
            <p className={style.loadContainerText}>Searching...</p>
            <CircularProgress />
          </div>
        ) : (
          <>
            {visibleContacts.length === 0 ? (
              <>
                <Brace number={sheetHeight} />

                {contacts.length === 0 ? (
                  <>{zeroContacts}</>
                ) : (
                  <>{zeroVisibleContacts}</>
                )}
              </>
            ) : (
              <>
                <Brace number={sheetHeight} />
                <ul className={style.list}>{contactsListItems}</ul>
              </>
            )}
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
