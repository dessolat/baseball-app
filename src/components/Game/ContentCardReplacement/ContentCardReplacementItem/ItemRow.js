import React from 'react';
import SwitchArrow from 'components/UI/dividers/SwitchArrow/SwitchArrow';
import ItemRowSideText from './ItemRowSideText';

const ItemRow = ({ event, rowNumber = 1, cl }) => (
  <div className={cl.textRow}>
    <ItemRowSideText event={event} cl={cl} rowNumber={rowNumber} />
    <SwitchArrow />
    <ItemRowSideText event={event} cl={cl} side='right' rowNumber={rowNumber} />
  </div>
);

export default ItemRow;
