import style from './Brace.module.css';

const Brace = ({ number, step = 100 }) => {
  const bracers = Array.from(
    { length: Number(number) },
    (_, idx) => 135 + Number(step) * idx
  );

  return (
    <div>
      {bracers.map(braceStep => {
        return (
          <div
            className={style.braceContainer}
            key={braceStep}
            style={{ top: braceStep }}
          >
            <div className={style.brace}></div>
            <div className={style.wholeContainer}>
              <div className={`${style.whole} ${style.left}`}></div>
              <div className={`${style.whole} ${style.right}`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Brace;
