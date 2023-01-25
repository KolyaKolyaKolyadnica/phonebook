import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const URL = 'https://connections-api.herokuapp.com';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // После вызова на все HTTP запросы будет вешаться Authorization = `Bearer ${token}`
    // "В ручную" этого больше делать не нужно
    // common - все запросы (можно указать get/post/... и т.д. вместо этого)
  },

  unset() {
    axios.defaults.headers.common.Authorization = '';
    // После вызова (логаута) в хэдере авторизация = ""
  },
};

export const postNewUser = createAsyncThunk(
  'auth/authSignUp',
  async credentials => {
    const { data } = await axios.post('/users/signup', credentials);

    token.set(data.token);

    return data;
  }
);

export const postLogin = createAsyncThunk(
  'auth/authLogIn',
  async credentials => {
    try {
      const { data } = await axios.post('/users/login', credentials);

      token.set(data.token);

      return data;
    } catch (error) {}
  }
);

export const postLogout = createAsyncThunk('auth/authLogOut', async () => {
  try {
    const { data } = await axios.post('users/logout');

    token.unset();
    return data;
  } catch (error) {
    /* error.message */
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);

    try {
      const { data } = await axios.get('/users/current');

      return data;
    } catch (error) {}
  }
);
