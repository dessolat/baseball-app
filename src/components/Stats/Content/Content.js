import React from 'react';
import cl from './Content.module.scss';
import { useParams } from 'react-router-dom';
import ContentTeamTable from '../ContentTeamTable/ContentTeamTable';
import ContentPlayerTable from '../ContentPlayerTable/ContentPlayerTable';
import SortField from 'components/UI/sortField/SortField';
import { useSelector } from 'react-redux';
import ActiveBodyCell from 'components/UI/ActiveBodyCell/ActiveBodyCell';

const Content = () => {
  const { statsType } = useParams();

  const tableMode = useSelector(state => state.stats.tableMode);

  const getTableHeaders = (sortField, sortDirection, handleFieldClick, cl) =>
    tableMode === 'Batting' ? (
      <>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          AB
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          H
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          1B
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
          RBI
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          GDP
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          BB
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
      </>
    ) : tableMode === 'Pitching' ? (
      <>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          2B
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          3B
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          BB
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          BK
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          ER
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          addedClass={cl.wider}>
          ERA
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          H
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          HP
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          HR
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          IBB
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          IP
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          NB
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          NP
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          NS
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          PA
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          R
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          SF
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          SH
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          SO
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          WP
        </SortField>
      </>
    ) : (
      <>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          A
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          CH
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          DP
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          E
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          addedClass={cl.wider}>
          FLD
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          PO
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          CS
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          LOB
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          R
        </SortField>
        <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
          SB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          addedClass={cl.wider}
          renamedField='SB_pr'>
          %SB
        </SortField>
      </>
    );

  const getTableRows = (row, cl, sortField) =>
    tableMode === 'Batting' ? (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>AB</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>H</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>1B</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>2B</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>3B</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>HR</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>RBI</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>GDP</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>BB</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>HP</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>SH</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>SF</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>SO</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>TB</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>AVG</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>SLG</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>OBP</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>OPS</ActiveBodyCell>
      </>
    ) : tableMode === 'Pitching' ? (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>2B</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>3B</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>BB</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>BK</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>ER</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={2} addedClass={cl.wider}>ERA</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>H</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>HP</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>HR</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>IBB</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={1}>IP</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>NB</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>NP</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>NS</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>PA</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>R</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>SF</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>SH</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>SO</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>WP</ActiveBodyCell>
      </>
    ) : (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>A</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>CH</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>DP</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>E</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>FLD</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>PO</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>CS</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>LOB</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>R</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>SB</ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>SB_pr</ActiveBodyCell>
      </>
    );

  //Sorting filtered array
  const getSortedStatsData = (filteredStatsData, sortField, sortDirection) =>
    filteredStatsData.sort((a, b) =>
      a[sortField] > b[sortField] ? (sortDirection === 'asc' ? 1 : -1) : sortDirection === 'asc' ? -1 : 1
    );
  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {statsType !== 'player' ? (
            <ContentTeamTable
              getTableHeaders={getTableHeaders}
              getTableRows={getTableRows}
              getSortedStatsData={getSortedStatsData}
            />
          ) : (
            <ContentPlayerTable
              getTableHeaders={getTableHeaders}
              getTableRows={getTableRows}
              getSortedStatsData={getSortedStatsData}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;
