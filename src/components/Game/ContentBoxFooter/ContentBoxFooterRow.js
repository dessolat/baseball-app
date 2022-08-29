import React from 'react';

const ContentBoxFooterRow = ({ footerArr, columnIndex, rowIndex }) => (
  <p>{footerArr[columnIndex * 6 + rowIndex]}</p>
);

export default ContentBoxFooterRow;
