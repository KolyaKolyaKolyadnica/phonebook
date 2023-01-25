import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserContacts = createAsyncThunk(
  'contacts/getUserContacts',
  async () => {
    const { data } = await axios.get('/contacts');

    return data;
  }
);

export const postUserContact = createAsyncThunk(
  'contacts/postUserContact',
  async newContact => {
    const { data } = await axios.post('/contacts', newContact);

    return data;
  }
);

export const deleteUserContact = createAsyncThunk(
  'contacts/deleteUserContact',
  async contactId => {
    const { data } = await axios.delete(`/contacts/${contactId}`);

    return data;
  }
);

export const patchUserContact = createAsyncThunk(
  'contacts/patchUserContact',
  async editedContact => {
    const contactId = editedContact.id;
    const bodyRequest = {
      name: editedContact.name,
      number: editedContact.number,
    };

    const { data } = await axios.patch(`/contacts/${contactId}`, bodyRequest);

    return data;
  }
);
