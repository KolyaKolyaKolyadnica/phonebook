import style from './Annotation.module.css';

export const Annotation = () => {
  return (
    <div className={style.container}>
      <h1 className={style.annotation}>Hi! It`s my small app - phonebook :D</h1>
      <p>In this paragraph I`ll write some tex about this app.</p>
    </div>
  );
};
