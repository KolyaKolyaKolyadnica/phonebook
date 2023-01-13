import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import phonebookActions from './phonebook-actions';
import { getContacts, postContact, deleteContact } from './phonebook-options';

const filter = createReducer('', builder => {
  builder.addCase(phonebookActions.filterByName, (_, { payload }) => payload);
});

const contacts = createReducer([], builder => {
  builder
    .addCase(getContacts.fulfilled, (_, { payload }) => payload)
    .addCase(postContact.fulfilled, (state, { payload }) => [...state, payload])
    .addCase(deleteContact.fulfilled, (state, { payload }) =>
      state.filter(contact => contact.id !== payload.id)
    );
});

const testIsLoading = createReducer(false, builder => {
  builder.addCase(getContacts.pending, () => 'getContacts.pending');
  builder.addCase(postContact.pending, () => 'postContact.pending');
  builder.addCase(deleteContact.pending, () => 'deleteContact.pending');
});

const testError = createReducer(null, builder => {
  builder.addCase(getContacts.rejected, () => 'getContacts.rejected');
  builder.addCase(postContact.rejected, () => 'postContact.rejected');
  builder.addCase(deleteContact.rejected, () => 'deleteContact.rejected');
});

const phonebookReducer = combineReducers({
  filter,
  contacts,

  testIsLoading,
  testError,
});

export default phonebookReducer;
