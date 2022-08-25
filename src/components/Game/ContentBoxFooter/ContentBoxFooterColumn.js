import React from 'react';

const ContentBoxFooterColumn = ({ columnIndex, footerArr }) => {
  const rowsArr = [];

  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    columnIndex * 6 + rowIndex < footerArr.length && rowsArr.push(null);
  }

  return (
    <div>
      {rowsArr.map((_, i) => (
        <p key={i}>{footerArr[columnIndex * 6 + i]}</p>
      ))}
    </div>
  );
};

export default ContentBoxFooterColumn;
