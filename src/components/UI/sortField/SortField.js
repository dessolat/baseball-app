import React from 'react';
import SortArrows from '../icons/SortArrows/SortArrows';
import cl from './SortField.module.scss';

const SortField = ({
  sortField,
  sortDirection,
  handleClick,
  addedClass = null,
  renamedField = null,
  arrowStyles = null,
  noAction = false,
  children
}) => {
  const isActive = sortField === (renamedField || children);
  const classes = [cl.cell, addedClass];
  isActive && classes.push(cl.active);
  return (
    <div onClick={handleClick(renamedField || children)} className={classes.join(' ')}>
      {children}
      {isActive && (
        <div className={cl.arrows} style={arrowStyles}>
          <SortArrows direction={sortDirection}/>
        </div>
      )}
    </div>
  );
};

export default SortField;
