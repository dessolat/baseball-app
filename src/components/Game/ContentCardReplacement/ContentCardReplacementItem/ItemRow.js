import React from 'react';
import classNames from 'classnames';
import SwitchArrow from 'components/UI/dividers/SwitchArrow/SwitchArrow';

const ItemRow = ({ event, rowNumber = 1, cl }) => {
  const leftSideStyles = classNames(cl.leftSide, {
    [cl.textBold]: (event.left_row2_index && rowNumber === 2) || (event.left_row1_index && rowNumber === 1)
  });

  const rightSideStyles = classNames(cl.rightSide, {
    [cl.textBold]: (event.right_row1_index && rowNumber === 1) || (event.right_row2_index && rowNumber === 2)
  });
  return (
    <div className={cl.textRow}>
      <p className={leftSideStyles}>
        {event[`left_row${rowNumber}_text`] || event[`left_row${rowNumber}_index`]}
      </p>
      <SwitchArrow />
      <p className={rightSideStyles}>
        {event[`right_row${rowNumber}_text`] || event[`right_row${rowNumber}_index`]}
      </p>
    </div>
  );
};

export default ItemRow;
