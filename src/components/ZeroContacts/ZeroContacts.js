import style from './ZeroContacts.module.css';

const ZeroContacts = ({ value }) => {
  if (value === 'save')
    return (
      <div className={style.notFound}>
        <p className={style.p1}>No contacts have been saved yet</p>
        <p className={style.p2}>Time to fix it :D</p>
        <p className={style.p3}>
          Click on the <span>folder icon</span> at the top of the sheet
        </p>
      </div>
    );

  if (value === 'find')
    return (
      <div className={style.notFound}>
        <p className={style.p1}>No such people have been found.</p>
        <p className={style.p2}>Maybe try something else?</p>
        <p className={style.p3}>
          Or is it a <span>sign</span> that it's time to
          <span>make new friends</span> :D
        </p>
      </div>
    );
};
export default ZeroContacts;
