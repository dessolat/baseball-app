import React from 'react';
import cl from './SortField.module.scss';

const SortField = ({
  sortField,
  sortDirection,
  handleClick,
  addedClass = null,
  renamedField = null,
  children
}) => {
  return (
    <div onClick={handleClick(renamedField || children)} className={cl.cell + ' ' + addedClass}>
      {sortField === (renamedField || children) && <span className={cl.invisibleArrow}>↓</span>}
      {children}
      <span className={cl.arrow}>
        {sortField === (renamedField || children) ? (sortDirection === 'asc' ? '↓' : '↑') : ''}
      </span>
    </div>
  );
};

export default SortField;
