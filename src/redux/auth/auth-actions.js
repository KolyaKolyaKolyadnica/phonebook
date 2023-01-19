import { createAction } from '@reduxjs/toolkit';

const authSignUp = createAction('auth/authSignUp');
const authLogIn = createAction('auth/authLogIn');
const authLogOut = createAction('auth/authLogOut');

const authActions = { authSignUp, authLogIn, authLogOut };
export default authActions;
