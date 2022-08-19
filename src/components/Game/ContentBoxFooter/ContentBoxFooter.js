import React from 'react';
import cl from './ContentBoxFooter.module.scss';

const ContentBoxFooter = ({ footer }) => {
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
      </div>
    </div>
  );
};

export default ContentBoxFooter;
