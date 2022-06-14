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

  const getTableHeaders = (sortField, sortDirection, handleFieldClick, cl, arrowStyles = null) =>
    tableMode === 'Batting' ? (
      <>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          G
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          AB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          R
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          H
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          2B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          3B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          HR
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          RBI
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          GDP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          BB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          IBB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          HP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SF
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SO
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          TB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          AVG
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          SLG
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          OBP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          OPS
        </SortField>
      </>
    ) : tableMode === 'Pitching' ? (
      <>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.tall}>
          G
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          GS
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          W
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          L
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.tall}>
          CG
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles} addedClass={cl.tall}>
          SV
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.wide3}>
          IP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.wide2_5}
					>
          PA
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.wide2_5}>
          R
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.wide2_5}>
          ER
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.wide2_5}>
          H
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          2B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          3B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles} addedClass={cl.tall}>
          HR
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.wide2}>
          BB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles} addedClass={cl.tall}>
          IBB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          HP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles} addedClass={cl.tall}>
          SH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles} addedClass={cl.tall}>
          SF
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.wide2_5}>
          SO
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          WP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles} addedClass={cl.tall}>
          BK
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wide3}>
          ERA
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
					addedClass={cl.wide3}>
          NP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles} addedClass={cl.wide3}>
          NS
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles} addedClass={cl.wide3}>
          NB
        </SortField>
      </>
    ) : (
      <>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          G
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          CS
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}
          renamedField='SB_pr'>
          %SB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          LOB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          CH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          PO
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          A
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          E
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          DP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          FLD
        </SortField>
      </>
    );

  const getTableRows = (row, cl, sortField) =>
    tableMode === 'Batting' ? (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>
          G
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          AB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          R
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          H
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          2B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          3B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          HR
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          RBI
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          GDP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          BB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          IBB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          HP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SH
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SF
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SO
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          TB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          AVG
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          SLG
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          OBP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          OPS
        </ActiveBodyCell>
      </>
    ) : tableMode === 'Pitching' ? (
      <>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          G
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          GS
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          W
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          L
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          CG
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          SV
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={1} addedClass={cl.wide3}>
          IP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          PA
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          R
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          ER
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          H
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          2B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          3B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          HR
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2}>
          BB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          IBB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          HP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          SH
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          SF
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          SO
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          WP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          BK
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={2} addedClass={cl.wide3}>
          ERA
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide3}>
          NP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}  addedClass={cl.wide3}>
          NS
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide3}>
          NB
        </ActiveBodyCell>
      </>
    ) : (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>
          G
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          CS
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          SB_pr
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          LOB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          CH
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          PO
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          A
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          E
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          DP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          FLD
        </ActiveBodyCell>
      </>
    );

  //Sorting filtered array
  const getSortedStatsData = (filteredStatsData, sortField, sortDirection) =>
    filteredStatsData.sort((a, b) =>
      Number(a[sortField]) > Number(b[sortField]) || a[sortField] === 'inf' || isNaN(a[sortField])
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1
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
