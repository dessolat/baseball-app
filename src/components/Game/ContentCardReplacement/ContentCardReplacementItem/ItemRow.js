import React from 'react';
import SwitchArrow from 'icons/switch_arrow.svg';
import classNames from 'classnames';

const ItemRow = ({ event, rowNumber = 1, cl }) => {
  // const firstRowRightStyles =
  //   (event.right_row1_index && rowNumber === 1) || (event.right_row2_index && rowNumber === 2)
  //     ? { fontWeight: 700 }
  //     : null;
  // const secondRowLeftStyles =
  //   ((event.left_row2_index && rowNumber === 2) || (event.left_row1_index && rowNumber === 1))  ? { fontWeight: 700, textAlign: 'right' } : null;

  const leftSideStyles = classNames(cl.leftSide, {
    [cl.textBold]: (event.left_row2_index && rowNumber === 2) || (event.left_row1_index && rowNumber === 1)
  });

  const rightSideStyles = classNames(cl.rightSide, {
    [cl.textBold]: (event.right_row1_index && rowNumber === 1) || (event.right_row2_index && rowNumber === 2)
  });
  return (
    <div className={cl.textRow}>
      <p
        className={leftSideStyles}
        // style={secondRowLeftStyles}
      >
        {event[`left_row${rowNumber}_text`] || event[`left_row${rowNumber}_index`]}
      </p>
      <div className={cl.arrowWrapper}>
        <img className={cl.switchArrow} src={SwitchArrow} alt='switch-arrow' />
      </div>
      <p
        className={rightSideStyles}
        // style={firstRowRightStyles}
      >
        {event[`right_row${rowNumber}_text`] || event[`right_row${rowNumber}_index`]}
      </p>
    </div>
  );
};

export default ItemRow;
