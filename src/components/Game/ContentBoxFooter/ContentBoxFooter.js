import React from 'react';
import cl from './ContentBoxFooter.module.scss';
import ContentBoxFooterColumn from './ContentBoxFooterColumn';

const ContentBoxFooter = ({ footer }) => {
  const footerArr = footer.split('\n');
  const columnsCount = Math.ceil(footerArr.length / 6);
  const columnsArr = new Array(columnsCount).fill('', 0, columnsCount);

  return (
    <div className={cl.footer}>
      <div className={cl.footerContainer}>
        {columnsArr.map((_, columnIndex) => (
          <ContentBoxFooterColumn key={columnIndex} columnIndex={columnIndex} footerArr={footerArr} />
        ))}
      </div>
    </div>
  );
};

export default ContentBoxFooter;