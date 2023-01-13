import { connect } from 'react-redux';
import { deleteContact } from '../../redux/phonebook/phonebook-options';
import ContactList from './ContactList';

const mapStateToProps = state => {
  const normalizedFilter = state.phonebook.filter.toLocaleLowerCase();

  const visibleContacts = state.phonebook.contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizedFilter)
  );

  return {
    contacts: visibleContacts,
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteContactTest: e => dispatch(deleteContact(e.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
