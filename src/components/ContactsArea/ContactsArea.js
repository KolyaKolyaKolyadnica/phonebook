import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

import { getUserContacts } from 'redux/contacts/contacts-options';
import phonebookActions from 'redux/contacts/contacts-actions';
import EditContact from '../EditContact';
import Modal from 'components/Modal';
import Brace from 'components/Brace';
import Contact from '../ContactsList';
import ZeroContacts from '../ZeroContacts';
import toastOptions from 'utils/toast-options';
import useBrace from '../../hooks/useBrace';

import style from './ContactsArea.module.css';

function ContactsArea({ filterValue }) {
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState(null);

  const dispatch = useDispatch();

  const contactsIsLoading = useSelector(
    state => state.contacts.userContactsLoading
  );
  const contacts = useSelector(state => state.contacts.userContacts);
  const userContactsError = useSelector(
    state => state.contacts.userContactsError
  );
  const visibleContacts =
    filterValue === ''
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(filterValue.toLowerCase())
        );

  const refContainer = createRef();
  const bracersNumber = useBrace(refContainer, visibleContacts, filterValue);

  useEffect(() => {
    dispatch(getUserContacts());
  }, [dispatch]);

  useEffect(() => {
    if (!userContactsError) return;

    toast.error(`${userContactsError}`, toastOptions);
    dispatch(phonebookActions.clearError());
  }, [userContactsError, dispatch]);

  useEffect(() => {
    if (contacts.length === 1) {
      toast.success(
        `${contacts.length} contact successfully loaded`,
        toastOptions
      );
    }
    if (contacts.length > 1) {
      toast.success(
        `${contacts.length} contacts successfully loaded`,
        toastOptions
      );
    }
  }, [dispatch, contacts.length]);

  const editContact = (id, name, number) => {
    setShowModal(true);

    setEditedContact({ id, name, number });
  };

  return (
    <>
      <div className={style.refContainer} ref={refContainer}>
        {contactsIsLoading ? (
          <div className={style.loadContainer}>
            <Brace number={bracersNumber} />
            <p className={style.loadContainerText}>Searching...</p>
            <CircularProgress />
          </div>
        ) : (
          <>
            <Brace number={bracersNumber} />
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
