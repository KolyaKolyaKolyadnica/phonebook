import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserContacts = createAsyncThunk(
  'contacts/getUserContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/contacts');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postUserContact = createAsyncThunk(
  'contacts/postUserContact',
  async (newContact, thunkAPI) => {
    try {
      const { data } = await axios.post('/contacts', newContact);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserContact = createAsyncThunk(
  'contacts/deleteUserContact',
  async (contactId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${contactId}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchUserContact = createAsyncThunk(
  'contacts/patchUserContact',
  async (editedContact, thunkAPI) => {
    const contactId = editedContact.id;
    const bodyRequest = {
      name: editedContact.name,
      number: editedContact.number,
    };

    try {
      const { data } = await axios.patch(`/contacts/${contactId}`, bodyRequest);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
