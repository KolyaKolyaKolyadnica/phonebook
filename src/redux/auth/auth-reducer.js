import { createReducer, createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authActions from './auth-actions';
import {
  postNewUser,
  postLogin,
  postLogout,
  fetchCurrentUser,
} from './auth-options';

const initialState = {
  user: { name: null, email: null },
  isLoggedIn: false,
  token: null,

  isFetchCurrentUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(postLogout.fulfilled, (state, action) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.isFetchCurrentUser = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isFetchCurrentUser = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isFetchCurrentUser = false;
      });
  },
});

export default authSlice.reducer;
