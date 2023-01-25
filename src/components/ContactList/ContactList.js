import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IconContext } from 'react-icons';
import { VscChromeClose } from 'react-icons/vsc';
import { GrEdit } from 'react-icons/gr';

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
  const [sheetHeight, setSheetHeight] = useState(400);

  const dispatch = useDispatch();
  const refComponent = createRef();

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
    if (visibleContacts.length !== 0) {
      const height = refComponent.current.getBoundingClientRect().height;

      const bracersNumber = Math.floor(height / STEP);

      setSheetHeight(bracersNumber);
    }
  }, [refComponent, visibleContacts]);

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
        </div>
      </li>
    );
  });

  return (
    <>
      {visibleContacts.length === 0 ? (
        <>
          <Brace number={sheetHeight} step={STEP} />
          <div className={style.notFound}>
            <p className={style.p1}>No such people have been found.</p>
            <p className={style.p2}>Maybe try something else?</p>
            <p className={style.p3}>
              Or is it a sign that it's time to <span>make new friends</span> :
              {')'}
            </p>
          </div>
        </>
      ) : (
        <>
          <Brace number={sheetHeight} step={STEP} />
          <ul className={style.list} ref={refComponent}>
            {contactsListItems}
          </ul>
        </>
      )}

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
