import style from './HomePage.module.css';
import { Annotation } from 'components/Annotation/Annotation';
import { PhonebookTitle } from 'components/PhonebookTitle/PhonebookTitle';

const HomePage = () => {
  return (
    <>
      <div className={style.container}>
        <Annotation />
        {/* <PhonebookTitle /> */}
      </div>
    </>
  );
};
export default HomePage;
