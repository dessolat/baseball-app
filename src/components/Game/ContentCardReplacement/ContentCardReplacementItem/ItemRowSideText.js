import React from 'react';
import classNames from 'classnames';

const ItemRowSideText = ({ event, cl, side = 'left', rowNumber = 1 }) => {
  const leftSideClasses = classNames(cl.leftSide, {
    [cl.textBold]: (event.left_row2_index && rowNumber === 2) || (event.left_row1_index && rowNumber === 1)
  });

  const rightSideClasses = classNames(cl.rightSide, {
    [cl.textBold]: (event.right_row1_index && rowNumber === 1) || (event.right_row2_index && rowNumber === 2)
  });

  const classes = side === 'left' ? leftSideClasses : rightSideClasses;
  return (
    <p className={classes}>
      {event[`${side}_row${rowNumber}_text`] || event[`${side}_row${rowNumber}_index`]}
    </p>
  );
};

export default ItemRowSideText;
