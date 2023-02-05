import { IconContext } from 'react-icons';
import { BiSad } from 'react-icons/bi';

import style from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <IconContext.Provider value={{ size: '130px', color: 'rgb(1, 65, 65)' }}>
        <BiSad />
      </IconContext.Provider>
      <p>This page does not exist</p>
      <p>Check the address</p>
    </div>
  );
};
export default NotFoundPage;
