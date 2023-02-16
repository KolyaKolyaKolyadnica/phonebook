import { useDispatch } from 'react-redux';
import { deleteUserContact } from 'redux/contacts/contacts-options';
import { Tooltip } from '@mui/material';
import { IconContext } from 'react-icons';
import { VscChromeClose } from 'react-icons/vsc';
import { GrEdit } from 'react-icons/gr';
import style from './ContactsList.module.css';

const ContactsList = ({ visibleContacts, editContact }) => {
  const dispatch = useDispatch();

  return (
    <ul className={style.list}>
      {visibleContacts.map(contact => {
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
      })}
    </ul>
  );
};

export default ContactsList;
