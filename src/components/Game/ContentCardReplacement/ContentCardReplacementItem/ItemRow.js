import React from 'react';
import SwitchArrow from 'icons/switch_arrow.svg';

const ItemRow = ({ event, rowNumber = 1, cl }) => {
  const firstRowRightStyles = event.right_row1_index && rowNumber === 1 ? { fontWeight: 700 } : null;
  const secondRowLeftStyles =
    event.left_row2_index && rowNumber === 2 ? { fontWeight: 700, textAlign: 'right' } : null;

  return (
    <div className={cl.textRow}>
      <p className={cl.leftSide} style={secondRowLeftStyles}>
        {event[`left_row${rowNumber}_text`] || event[`left_row${rowNumber}_index`]}
      </p>
      <img className={cl.switchArrow} src={SwitchArrow} alt='switch-arrow' />
      <p className={cl.rightSide} style={firstRowRightStyles}>
        {event[`right_row${rowNumber}_text`] || event[`right_row${rowNumber}_index`]}
      </p>
    </div>
  );
};

export default ItemRow;
