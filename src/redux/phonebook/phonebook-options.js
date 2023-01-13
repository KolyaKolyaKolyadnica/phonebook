import { createAsyncThunk } from '@reduxjs/toolkit';

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
