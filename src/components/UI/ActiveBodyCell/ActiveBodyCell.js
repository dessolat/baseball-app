import React from 'react';
import cl from './ActiveBodyCell.module.scss';

const ActiveBodyCell = ({ sortField, addedClass = null, row, fixed = null, children }) => {
  const isRow = row !== undefined;

  return (
    <>
      {isRow && (
        <div className={sortField === children ? cl.activeCell + ' ' + addedClass : addedClass}>
          {fixed ? Number(row[children]).toFixed(fixed) : row[children]}
        </div>
      )}
    </>
  );
};

export default ActiveBodyCell;
