import React, { forwardRef } from 'react';
import SortField from 'components/UI/sortField/SortField';
import { useDispatch, useSelector } from 'react-redux';
import { setSortField } from 'redux/playerStatsReducer';

const ContentMobileTableHeader = (
  { cl, playerYears, currentLeague, isScrollable, sortField, sortDirection, fieldsInfo, setSortDirection },
  ref
) => {
  const tableMode = useSelector(state => state.playerStats.tableType);
  const dispatch = useDispatch();

  const getTableHeaders = (sortField, sortDirection, handleFieldClick, arrowStyles = null) => (
    <>
      {currentLeague.id === -1 && (tableMode === 'Batting' || tableMode === 'Pitching') && (
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          G
        </SortField>
      )}
      {fieldsInfo
        .filter(field => field.type === tableMode.toLowerCase())
        .map((field, i) => (
          <SortField
            key={i}
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            arrowStyles={arrowStyles}
            addedClass={field.addedClass}>
            {field.childField || field.name}
          </SortField>
        ))}
    </>
  );

  const handleFieldClick = field => () => {
    sortField[tableMode] !== field
      ? dispatch(setSortField(field))
      : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  let leftHeaderStyles = {
    flex: `0 0 ${currentLeague.id !== -1 ? 190 : playerYears === 'All years' ? 185.5 : 140.5}px`
  };
  !isScrollable && Object.assign(leftHeaderStyles, { borderRight: 'none', boxShadow: 'none' });
  return (
    <div className={cl.fullHeader}>
      <div className={cl.leftHeader} style={leftHeaderStyles}>
        {playerYears === 'All years' && <div className={cl.years}>Years</div>}
        {currentLeague.id === -1 && <div className={cl.league}>League</div>}
        {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
      </div>
      <div className={cl.rightHeader} ref={ref}>
        {getTableHeaders(sortField[tableMode], sortDirection, handleFieldClick, {
          top: '.1rem',
          transform: 'translateX(-50%) scale(0.7)'
        })}
      </div>
    </div>
  );
};

export default forwardRef(ContentMobileTableHeader);
