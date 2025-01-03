import React from 'react';
import cl from './ActiveBodyCell.module.scss';
import classNames from 'classnames';

const ActiveBodyCell = ({
  sortField,
  addedClass = null,
  row,
  fixed = null,
  noAction = false,
  currentGameType = null,
  isCustomLeagues = null,
	statsType = null,
  children
}) => {
  const isRow = row !== undefined;

  let classes, cellValue;

  if (isRow) {
    classes = classNames(addedClass, {
      [cl.activeCell]: sortField === children && !noAction
    });

    cellValue =
      row[children] < 0
        ? '—'
        : row[children] === 'inf' || row[children] === 'INF'
        ? 'INF'
        : fixed
        ? Number(row[children]).toFixed(fixed)
        : children === 'G' && isCustomLeagues && statsType !== 'player'
        ? row[children][currentGameType]
        : row[children];
  }

  return <>{isRow && <div className={classes}>{cellValue}</div>}</>;
};

export default ActiveBodyCell;
