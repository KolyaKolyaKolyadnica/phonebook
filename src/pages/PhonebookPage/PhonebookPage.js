import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import style from './PhonebookPage.module.css';

const PhonebookPage = () => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.filterContainer}>
          <Filter />
        </div>
        <div className={style.addNewContactContainer}>
          <ContactForm />
          {/* Add new */}
        </div>
      </header>

      <div className={style.content}>
        <ContactList />
      </div>
    </div>
  );
};
export default PhonebookPage;
