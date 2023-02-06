import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress } from '@mui/material';

import { toast } from 'react-toastify';

import { getUserContacts } from 'redux/phonebook/phonebook-options';
import EditContact from '../EditContact';
import Modal from 'components/Modal';
import Brace from 'components/Brace';
import Contact from '../ContactsList';
import ZeroContacts from '../ZeroContacts';

import phonebookActions from 'redux/phonebook/phonebook-actions';
import style from './ContactsArea.module.css';

function ContactsArea({ filterValue }) {
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
  const visibleContacts =
    filterValue === ''
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(filterValue.toLowerCase())
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
            <Brace number={sheetHeight} />
            {visibleContacts.length === 0 ? (
              <>
                {contacts.length === 0 ? (
                  <ZeroContacts value="save" />
                ) : (
                  <ZeroContacts value="find" />
                )}
              </>
            ) : (
              <Contact
                visibleContacts={visibleContacts}
                editContact={editContact}
              />
            )}
          </>
        )}
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(!showModal)}
          closeOnClickOverlay={false}
        >
          <EditContact
            editedContact={editedContact}
            onClose={() => setShowModal(!showModal)}
          />
        </Modal>
      )}
    </>
  );
}

export default ContactsArea;
