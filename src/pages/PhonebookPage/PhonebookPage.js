import { useState } from 'react';
import { Button, createTheme, ThemeProvider, Tooltip } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

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
    },
  },
});

const PhonebookPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  return (
    <div className={style.container}>
      <div className={style.decor}></div>

      <div className={style.content}>
        <header className={style.header}>
          <Filter setFilterValue={setFilterValue} />

          <ThemeProvider theme={theme}>
            <Tooltip
              title="Add contacts"
              arrow
              sx={{
                '&:hover .MuiSvgIcon-root': {
                  color: 'rgb(25, 118, 210)',
                },
              }}
            >
              <Button color="neutral" onClick={() => setShowModal(!showModal)}>
                <CreateNewFolderIcon sx={{ fontSize: 50 }} />
              </Button>
            </Tooltip>
          </ThemeProvider>
        </header>

        <ContactList filterValue={filterValue} />
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(!showModal)}>
          <ContactForm onClose={() => setShowModal(!showModal)} />
        </Modal>
      )}
    </div>
  );
};
export default PhonebookPage;
