import React from 'react';
import ItemRow from './ItemRow';

const ItemTextBlock = ({ cl, header, event, isVideo }) => {
  return (
    <div className={cl.textBlock}>
      {header !== null && !isVideo && <p className={cl.textBold}>{header}</p>}
      <div className={cl.text}>
        <ItemRow event={event} rowNumber={1} cl={cl} />
        {event.rows_numbers === 2 && <ItemRow event={event} rowNumber={2} cl={cl} />}
      </div>
    </div>
  );
};

export default ItemTextBlock;
