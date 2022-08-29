import React from 'react';
import ContentBoxFooterRow from './ContentBoxFooterRow';

const ContentBoxFooterColumn = ({ columnIndex, footerArr }) => {
  const rowsArr = [];

  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    columnIndex * 6 + rowIndex < footerArr.length && rowsArr.push(null);
  }

  return (
    <div>
      {rowsArr.map((_, rowIndex) => (
        <ContentBoxFooterRow
          key={rowIndex}
          footerArr={footerArr}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
        />
      ))}
    </div>
  );
};

export default ContentBoxFooterColumn;
