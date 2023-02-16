import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import phonebookActions from './contacts-actions';
import {
  getUserContacts,
  postUserContact,
  deleteUserContact,
  patchUserContact,
} from './contacts-options';

const userContactsLoading = createReducer(false, builder => {
  builder
    .addCase(getUserContacts.fulfilled, () => false)
    .addCase(getUserContacts.pending, () => true)
    .addCase(getUserContacts.rejected, () => false);
});

const userContactsError = createReducer(null, builder => {
  builder
    .addCase(getUserContacts.rejected, (_, action) => action.payload)
    .addCase(postUserContact.rejected, (_, action) => action.payload)
    .addCase(deleteUserContact.rejected, (_, action) => action.payload)
    .addCase(patchUserContact.rejected, (_, action) => action.payload)
    .addCase(phonebookActions.clearError, () => null);
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
    )
    .addCase(patchUserContact.fulfilled, (state, { payload }) => {
      return state.map(contact =>
        contact.id === payload.id ? payload : contact
      );
    });
});

const contactsReducer = combineReducers({
  userContactsLoading,
  userContactsError,

  userContacts,
});

export default contactsReducer;
