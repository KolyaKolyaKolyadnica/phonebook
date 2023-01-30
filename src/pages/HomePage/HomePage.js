import style from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.text}>
          A very useful application for storing contacts.
        </p>
        <p className={style.text}>
          I already know what you're thinking: "Pf... Why would I keep them here
          when I have my phone?"
        </p>
        <p className={style.text}>
          And I will answer: "The benefit is not that you can use contacts very
          conveniently, but that you can look at my project created with React
          using Redax, React-Rout and much more!"
        </p>
        <p className={`${style.text} ${style.wishes}`}>Happy using :D</p>

        <div className={style.fieldToFill}>
          <div className={style.line}></div>
          <div className={style.line}></div>
          <div className={style.line}></div>
        </div>
      </div>
      <div className={style.decor}></div>
    </div>
  );
};
export default HomePage;
