import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import SortField from 'components/UI/sortField/SortField';
import React from 'react';
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
	fieldsInfo
}) => {
  const tableType = useSelector(state => state.playerStats.tableType);

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
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wide}>
        AB
      </SortField>
      {/* <div className={cl.sortFieldWrapper}> */}
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        R
      </SortField>
      {/* </div> */}
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        H
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        2B
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        3B
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        HR
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        RBI
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wide}>
        GDP
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        BB
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        IBB
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        HP
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        SH
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        SF
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        SO
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wide}>
        TB
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wider}>
        AVG
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wider}>
        SLG
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wider}>
        OBP
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wider}>
        OPS
      </SortField>
      <div className={cl.sortFieldWrapper + ' ' + cl.tall}>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          SB
        </SortField>
      </div>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        CS
      </SortField>

      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wider}
        renamedField='SB_pr'>
        %SB
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        LOB
      </SortField>
      <div className={cl.sortFieldWrapper + ' ' + cl.wide}>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          CH
        </SortField>
      </div>
      <div className={cl.sortFieldWrapper}>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          PO
        </SortField>
      </div>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        A
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        E
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.tall}>
        DP
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wider}
        renamedField='FLD'>
        FLD%
      </SortField>
    </div>
  );
};

export default ContentBattingTableHeader;
