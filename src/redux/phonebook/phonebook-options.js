import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://63b432e99f50390584a9cbcd.mockapi.io/contacts';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    const response = await fetch(URL);
    const contacts = await response.json();
    return contacts;
  }
);

export const postContact = createAsyncThunk(
  'contacts/postContacts',
  async newContact => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    };

    const response = await fetch(URL, options);
    const contact = await response.json();
    return contact;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',

  async contactId => {
    const options = {
      method: 'DELETE',
    };

    const response = await fetch(`${URL}/${contactId}`, options);
    const contact = await response.json();

    return contact;
  }
);

// ====================================

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },

//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

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
    const { data } = await axios.delete(`/contacts/${contactId}`, contactId);

    return data;
  }
);
