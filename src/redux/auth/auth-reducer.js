import { createSlice } from '@reduxjs/toolkit';
import {
  postNewUser,
  postLogin,
  postLogout,
  fetchCurrentUser,
} from './auth-options';

// import errorClear from './auth-actions';

const initialState = {
  user: { name: null, email: null },
  isLoggedIn: false,
  token: null,

  isFetchCurrentUser: false,

  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    errorClear(state, action) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(postNewUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.error = action.payload;
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
