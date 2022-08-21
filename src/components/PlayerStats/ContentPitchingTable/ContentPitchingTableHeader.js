import React from 'react';
import cl from './ContentPitchingTable.module.scss';
import SortField from 'components/UI/sortField/SortField';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector } from 'react-redux';
import SortArrows from 'components/UI/icons/SortArrows/SortArrows';

const ContentPitchingTableHeader = ({
  playerYears,
  currentLeague,
  sortField,
  sortDirection,
  handleFieldClick,
  getSortedTableOptions,
  handleTableOptionClick,
  fieldsInfo,
	setSortDirection
}) => {
  const tableType = useSelector(state => state.playerStats.tableType);

  const getHeaderCells = () => {
    return (
      <>
        {fieldsInfo.map((field, i) => (
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={field.addedClass}
            renamedField={field.name}
            noAction={currentLeague.id !== -1}>
            {field.name}
          </SortField>
        ))}
      </>
    );
  };

	const handleGameHeaderClick = () => {
		setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
	}
  return (
    <div className={cl.tableHeader}>
      {playerYears === 'All years' && <div className={cl.year}>Years</div>}
      {currentLeague.id === -1 && <div className={cl.league}>League</div>}
      {currentLeague.id !== -1 && (
        <div className={cl.game} onClick={handleGameHeaderClick}>
          Game
          <div className={cl.arrows}>
            <SortArrows direction={sortDirection} />
          </div>
        </div>
      )}
      <div className={cl.teamName}>
        Team
        <div className={cl.dropWrapper}>
          {getSortedTableOptions().length > 1 ? (
            <Dropdown
              title={tableType}
              options={getSortedTableOptions()}
              currentOption={tableType}
              handleClick={handleTableOptionClick}
            />
          ) : getSortedTableOptions().length === 1 ? (
            tableType
          ) : (
            ''
          )}
        </div>
      </div>
      {currentLeague.id === -1 && (
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          G
        </SortField>
      )}
      {getHeaderCells()}
    </div>
  );
};

export default ContentPitchingTableHeader;
