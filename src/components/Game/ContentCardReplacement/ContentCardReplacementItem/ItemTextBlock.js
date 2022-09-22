import React from 'react';
import ItemTextBlockBody from './ItemTextBlockBody';
import ItemTextBlockHeader from './ItemTextBlockHeader';

const ItemTextBlock = ({ cl, header, event, isVideo }) => {
  const isHeader = header !== null && !isVideo;

  return (
    <div className={cl.textBlock}>
      {isHeader && <ItemTextBlockHeader cl={cl} header={header} />}
      <ItemTextBlockBody cl={cl} event={event}/>
    </div>
  );
};

export default ItemTextBlock;
