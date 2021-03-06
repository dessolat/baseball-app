import React from 'react';
import cl from './ContentPitchingTable.module.scss';
import SortField from 'components/UI/sortField/SortField';

const ContentPitchingTableHeader = ({
  playerYears,
  currentLeague,
  sortField,
  sortDirection,
  handleFieldClick
}) => {
  return (
    <div className={cl.tableHeader}>
      {playerYears === 'All years' && <div className={cl.year}>Years</div>}
      {currentLeague.id === -1 && <div className={cl.league}>League</div>}
      {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
			<div className={cl.teamName}>Team</div>
			{currentLeague.id === -1 && 
			<SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        G
      </SortField>}
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        GS
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        W
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        L
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        CG
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        SV
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}addedClass={cl.wide2}>
        IP
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}addedClass={cl.wide}>
        PA
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        R
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        ER
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        H
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        2B
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        3B
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        HR
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        BB
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        IBB
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        HP
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        SH
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        SF
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        SO
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        WP
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
        BK
      </SortField>
      <SortField
        sortField={sortField}
        sortDirection={sortDirection}
        handleClick={handleFieldClick}
        addedClass={cl.wide3}>
        ERA
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}addedClass={cl.wide}>
        NP
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}addedClass={cl.wide}>
        NS
      </SortField>
      <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}addedClass={cl.wide}>
        NB
      </SortField>
    </div>
  );
};

export default ContentPitchingTableHeader;
