import style from './PhonebookTitle.module.css';

export const PhonebookTitle = () => {
  return (
    <div className={style.container}>
      <div className={style.book}>
        <div className={style.bookTitle}>Phonebook</div>
        <div className={style.stickerContainer}>
          <div className={`${style.sticker} ${style.green}`}></div>
          <div className={`${style.sticker} ${style.blue}`}></div>
          <div className={`${style.sticker} ${style.red}`}></div>
          <div className={`${style.sticker} ${style.yellow}`}></div>
        </div>
      </div>
    </div>
  );
};
