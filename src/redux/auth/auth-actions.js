import { createAction } from '@reduxjs/toolkit';

// const authSignUp = createAction('auth/authSignUp');
// const authLogIn = createAction('auth/authLogIn');
// const authLogOut = createAction('auth/authLogOut');

const errorClear = createAction('auth/errorClear');

const authActions = { errorClear };
export default authActions;
