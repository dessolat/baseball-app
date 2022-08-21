import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import SortField from 'components/UI/sortField/SortField';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const ContentBattingTableHeader = ({
  cl,
  playerYears,
  currentLeague,
  getSortedTableOptions,
  handleTableOptionClick,
  sortField,
  sortDirection,
  handleFieldClick,
  fieldsInfo,
	setSortDirection
}) => {
  const tableType = useSelector(state => state.playerStats.tableType);

  const getHeaderCells = () => {
    return (
      <>
        {fieldsInfo.map((field, i) => (
          <Fragment key={i}>
            {field.headerWrapped ? (
              <div className={cl.sortFieldWrapper + ' ' + field.addedClass || null}>
                <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick} renamedField={field.name} noAction={currentLeague.id !== -1}>
                  {field.childField || field.name}
                </SortField>
              </div>
            ) : (
              <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick} addedClass={field.addedClass} renamedField={field.name} noAction={currentLeague.id !== -1}>
                {field.childField || field.name}
              </SortField>
            )}
          </Fragment>
        ))}
      </>
    );
  };
  return (
    <div className={cl.tableHeader}>
      {playerYears === 'All years' && <div className={cl.year}>Years</div>}
      {currentLeague.id === -1 && <div className={cl.league}>League</div>}
      {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
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
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          addedClass={cl.tall}>
          G
        </SortField>
      )}
			{getHeaderCells()}
    </div>
  );
};

export default ContentBattingTableHeader;
