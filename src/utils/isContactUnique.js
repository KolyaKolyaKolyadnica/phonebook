import { toast } from 'react-toastify';
import toastOptions from 'utils/toast-options';

const isContactUnique = (name, number, contacts) => {
  const notUnique = contacts.some(
    contact => contact.name === name && contact.number === number
  );

  if (notUnique) {
    toast.warning('This name already exists', toastOptions);
  }

  return notUnique ? false : true;
};
export default isContactUnique;
