import React from 'react';

const ItemTextBlockHeader = ({ cl, header }) => {
  const headerClasses = [cl.textBold, cl.textAlignCenter].join(' ');

  return <p className={headerClasses}>{header}</p>;
};

export default ItemTextBlockHeader;
