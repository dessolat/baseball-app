import React from 'react';
import SortArrows from '../icons/SortArrows/SortArrows';
import cl from './SortField.module.scss';

const SortField = ({
  sortField,
  sortDirection,
  handleClick,
  addedClass = null,
  renamedField = null,
  children
}) => {
  const isActive = sortField === (renamedField || children);
  const classes = [cl.cell, addedClass];
  isActive && classes.push(cl.active);
  return (
    <div onClick={handleClick(renamedField || children)} className={classes.join(' ')}>
      {children}
      {isActive && (
        <div className={cl.arrows}>
          <SortArrows direction={sortDirection}/>
        </div>
      )}
    </div>

    // <div onClick={handleClick(renamedField || children)} className={cl.cell + ' ' + addedClass}>
    //   {sortField === (renamedField || children) && <span className={cl.invisibleArrow}>↓</span>}
    //   {children}
    //   <span className={cl.arrow}>
    //     {sortField === (renamedField || children) ? (sortDirection === 'asc' ? '↓' : '↑') : ''}
    //   </span>
    // </div>
  );
};

export default SortField;
