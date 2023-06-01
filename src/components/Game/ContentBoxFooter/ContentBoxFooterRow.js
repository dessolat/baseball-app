import React from 'react';

const ContentBoxFooterRow = ({ footerArr, columnIndex, rowIndex }) => {
  const rowTextArr = footerArr[columnIndex * 6 + rowIndex].split(':');

  return (
    <p>
      {rowTextArr[0]}:
      <span>{rowTextArr[1]}</span>
    </p>
  );
};

export default ContentBoxFooterRow;
