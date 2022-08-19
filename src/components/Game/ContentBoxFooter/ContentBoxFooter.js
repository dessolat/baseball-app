import React from 'react';
import cl from './ContentBoxFooter.module.scss';

const ContentBoxFooter = ({ footer }) => {
  // const { location, stadium, weather, att, t, umpires, scorers, tc } = footer || {};

  const footerArr = footer.split('\n');
  const columnsCount = Math.ceil(footerArr.length / 6);
  const columnsArr = new Array(columnsCount).fill('', 0, columnsCount);

  return (
    <div className={cl.footer}>
      <div className={cl.footerContainer}>
        {columnsArr.map((_, i) => {
          const rowsArr = [];
          for (let j = 0; j < 6; j++) {
            i * 6 + j < footerArr.length && rowsArr.push(null);
          }
          return (
            <div key={i}>
              {rowsArr.map((_, k) => (
                <p key={k}>{footerArr[i * 6 + k]}</p>
              ))}
            </div>
          );
        })}

        {/* <div>
          <p>Location: <span>{location}</span></p>
          <p>Stadium: <span>{stadium}</span></p>
          <p>Weather: <span>{weather}</span></p>
          <p>Att: <span>{att}</span></p>
          <p>Time: <span>{t}</span></p>
          <p>HP Umpire: <span>{umpires ? umpires[0] : ' '}</span></p>
        </div>
        <div>
          <p>1B Umpire: <span>{umpires ? umpires[1] : ' '}</span></p>
          <p>Scorer: <span>{scorers ? scorers[0] : ' '}</span></p>
          <p>Scorer: <span>{scorers ? scorers[1] : ' '}</span></p>
          <p>Scorer: <span>{scorers ? scorers[2] : ' '}</span></p>
          <p>TC: <span>{tc ? tc[0] : ' '}</span></p>
          <p>TC: <span>{tc ? tc[1] : ' '}</span></p>
        </div> */}
      </div>
    </div>
  );
};

export default ContentBoxFooter;
