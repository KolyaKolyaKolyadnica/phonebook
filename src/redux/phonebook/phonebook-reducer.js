import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import phonebookActions from './phonebook-actions';
import {
  getContacts,
  postContact,
  deleteContact,
  getUserContacts,
  postUserContact,
  deleteUserContact,
} from './phonebook-options';

const filter = createReducer('', builder => {
  builder.addCase(phonebookActions.filterByName, (_, { payload }) => payload);
});

const userContacts = createReducer([], builder => {
  builder
    .addCase(getUserContacts.fulfilled, (_, { payload }) => payload)
    .addCase(postUserContact.fulfilled, (state, { payload }) => [
      ...state,
      payload,
    ])
    .addCase(deleteUserContact.fulfilled, (state, { payload }) =>
      state.filter(contact => contact.id !== payload.id)
    );
});

const phonebookReducer = combineReducers({
  filter,

  userContacts,
});

export default phonebookReducer;
