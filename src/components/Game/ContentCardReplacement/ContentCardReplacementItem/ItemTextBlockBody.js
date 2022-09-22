import React from 'react';
import ItemRow from './ItemRow';

const ItemTextBlockBody = ({ cl, event }) => {
  const isSecondRow = event.rows_numbers === 2;

  return (
    <div className={cl.text}>
      <ItemRow event={event} rowNumber={1} cl={cl} />
      {isSecondRow && <ItemRow event={event} rowNumber={2} cl={cl} />}
    </div>
  );
};

export default ItemTextBlockBody;
