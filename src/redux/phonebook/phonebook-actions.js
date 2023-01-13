import { createAction } from '@reduxjs/toolkit';

const filterByName = createAction('phonebook/filterByName');

const phonebookActions = {
  filterByName,
};
export default phonebookActions;
