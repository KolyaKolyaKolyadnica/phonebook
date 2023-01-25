import { useState } from 'react';
import { IconContext } from 'react-icons';
import { ImFolderPlus } from 'react-icons/im';

// Pages and Components
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Modal from 'components/Modal';

import style from './PhonebookPage.module.css';

const PhonebookPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={style.container}>
        <div className={style.decor}></div>

        <div className={style.content}>
          <header className={style.header}>
            <div className={style.filterContainer}>
              <Filter />
            </div>
            <div className={style.addNewContactContainer}>
              <button type="button" onClick={() => setShowModal(!showModal)}>
                <IconContext.Provider
                  value={{ size: '40px', color: 'rgb(89, 89, 89)' }}
                >
                  <ImFolderPlus />
                </IconContext.Provider>
              </button>
            </div>
          </header>

          <div className={style.contactsList}>
            <ContactList />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(!showModal)}>
          <ContactForm onClose={() => setShowModal(!showModal)} />
        </Modal>
      )}
    </>
  );
};
export default PhonebookPage;
