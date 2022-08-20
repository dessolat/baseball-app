import React from 'react';
import cl from './ActiveBodyCell.module.scss';

const ActiveBodyCell = ({ sortField, addedClass = null, row, fixed = null, noAction = false, children }) => {
  const isRow = row !== undefined;

	const classes = [addedClass]
	sortField === children && !noAction && classes.push(cl.activeCell)
  return (
    <>
      {isRow && (
        <div className={classes.join(' ')}>
          {row[children] < 0
            ? '—'
            : row[children] === 'inf'
            ? 'INF'
            : fixed
            ? Number(row[children]).toFixed(fixed)
            : row[children]}
        </div>
      )}
    </>
  );
};

export default ActiveBodyCell;
