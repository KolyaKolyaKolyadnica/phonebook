import { createAction } from '@reduxjs/toolkit';

const clearError = createAction('phonebook/clearError');

const phonebookActions = {
  clearError,
};
export default phonebookActions;
