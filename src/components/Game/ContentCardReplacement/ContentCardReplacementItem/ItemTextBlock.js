import React from 'react';
import ItemRow from './ItemRow';
import ItemTextBlockHeader from './ItemTextBlockHeader';

const ItemTextBlock = ({ cl, header, event, isVideo }) => {
  const isHeader = header !== null && !isVideo;

  return (
    <div className={cl.textBlock}>
      {isHeader && <ItemTextBlockHeader cl={cl} header={header} />}
      <div className={cl.text}>
        <ItemRow event={event} rowNumber={1} cl={cl} />
        {event.rows_numbers === 2 && <ItemRow event={event} rowNumber={2} cl={cl} />}
      </div>
    </div>
  );
};

export default ItemTextBlock;
