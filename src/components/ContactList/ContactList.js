import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserContacts,
  deleteUserContact,
} from 'redux/phonebook/phonebook-options';
import style from './ContactList.module.css';

function ContactList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserContacts());
  }, [dispatch]);

  const contacts = useSelector(state => state.phonebook.userContacts);

  const contactsListItems = contacts.map(contact => {
    return (
      <li key={contact.id} className={style.listItem}>
        <p className={style.contact}>
          {contact.name}: {contact.number}
        </p>

        <button
          value={contact.id}
          onClick={() => dispatch(deleteUserContact(contact.id))}
        >
          Delete
        </button>
      </li>
    );
  });

  return (
    <>
      <div>CONTACTS MUST BE HERE</div>
      {contacts.length === 0 ? (
        <p>No contacts yet</p>
      ) : (
        <ul className={style.list}>{contactsListItems}</ul>
      )}
    </>
  );
}

export default ContactList;
