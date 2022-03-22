import React from 'react';
import cl from './Content.module.scss';
import { useParams } from 'react-router-dom';
import ContentTeamTable from '../ContentTeamTable/ContentTeamTable';
import ContentPlayerTable from '../ContentPlayerTable/ContentPlayerTable';
import SortField from 'components/UI/sortField/SortField';
import { useSelector } from 'react-redux';

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

  const getTableRows = (row, cl) =>
    tableMode === 'Batting' ? (
      <>
        <div>{row.AB}</div>
        <div>{row.H}</div>
        <div>{row['1B']}</div>
        <div>{row['2B']}</div>
        <div>{row['3B']}</div>
        <div>{row.HR}</div>
        <div>{row.RBI}</div>
        <div>{row.GDP}</div>
        <div>{row.BB}</div>
        <div>{row.HP}</div>
        <div>{row.SH}</div>
        <div>{row.SF}</div>
        <div>{row.SO}</div>
        <div>{row.TB}</div>
        <div className={cl.wider}>{Number(row.AVG).toFixed(3)}</div>
        <div className={cl.wider}>{Number(row.SLG).toFixed(3)}</div>
        <div className={cl.wider}>{Number(row.OBP).toFixed(3)}</div>
        <div className={cl.wider}>{Number(row.OPS).toFixed(3)}</div>
      </>
    ) : tableMode === 'Pitching' ? (
      <>
        <div>{row['2B']}</div>
        <div>{row['3B']}</div>
        <div>{row.BB}</div>
        <div>{row.BK}</div>
        <div>{row.ER}</div>
        <div className={cl.wider}>{Number(row.ERA).toFixed(2)}</div>
        <div>{row.H}</div>
        <div>{row.HP}</div>
        <div>{row.HR}</div>
        <div>{row.IBB}</div>
        <div>{Number(row.IP).toFixed(1)}</div>
        <div>{row.NB}</div>
        <div>{row.NP}</div>
        <div>{row.NS}</div>
        <div>{row.PA}</div>
        <div>{row.R}</div>
        <div>{row.SF}</div>
        <div>{row.SH}</div>
        <div>{row.SO}</div>
        <div>{row.WP}</div>
      </>
    ) : (
      <>
        <div>{row.A}</div>
        <div>{row.CH}</div>
        <div>{row.DP}</div>
        <div>{row.E}</div>
        <div className={cl.wider}>{Number(row.FLD).toFixed(3)}</div>
        <div>{row.PO}</div>
        <div>{row.CS}</div>
        <div>{row.LOB}</div>
        <div>{row.R}</div>
        <div>{row.SB}</div>
        <div className={cl.wider}>{Number(row.SB_pr).toFixed(3)}</div>
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
