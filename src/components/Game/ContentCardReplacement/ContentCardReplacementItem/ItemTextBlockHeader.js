import React from 'react';

const ItemTextBlockHeader = ({ cl, header }) => {
  return (
    <p className={cl.textBold} style={{ textAlign: 'center' }}>
      {header}
    </p>
  );
};

export default ItemTextBlockHeader;
