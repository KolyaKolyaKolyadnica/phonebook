import { useState } from 'react';
import { IconContext } from 'react-icons';
import { ImFolderPlus } from 'react-icons/im';
import { Button, createTheme, ThemeProvider, Tooltip } from '@mui/material';

// Pages and Components
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Modal from 'components/Modal';

import style from './PhonebookPage.module.css';

const theme = createTheme({
  palette: {
    neutral: {
      main: 'rgb(89, 89, 89)',
      // contrastText: 'rgb(0, 0, 0)',
    },
  },
});

const PhonebookPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <div className={style.container}> */}
      <div className={style.decor}></div>

      <div className={style.content}>
        <header className={style.header}>
          <div className={style.filterContainer}>
            <Filter />
          </div>

          <div className={style.addNewContactContainer}>
            <ThemeProvider theme={theme}>
              <Tooltip title="Add contacts" arrow>
                <Button
                  color="neutral"
                  onClick={() => setShowModal(!showModal)}
                >
                  <IconContext.Provider
                    value={{ size: '40px', color: 'rgb(89, 89, 89)' }}
                  >
                    <ImFolderPlus />
                  </IconContext.Provider>
                </Button>
              </Tooltip>
            </ThemeProvider>
          </div>
        </header>

        <ContactList />
      </div>
      {/* </div> */}

      {showModal && (
        <Modal onClose={() => setShowModal(!showModal)}>
          <ContactForm onClose={() => setShowModal(!showModal)} />
        </Modal>
      )}
    </>
  );
};
export default PhonebookPage;
