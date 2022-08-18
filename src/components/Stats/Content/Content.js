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

  const fieldsInfo = [
    { name: 'G', type: 'batting', fixed: null, addedClass: cl.wide },
    { name: 'AB', type: 'batting', fixed: null, addedClass: cl.wide },
    { name: 'R', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: 'H', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: '2B', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: '3B', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: 'HR', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: 'RBI', type: 'batting', fixed: null, addedClass: null },
    { name: 'GDP', type: 'batting', fixed: null, addedClass: cl.wide },
    { name: 'BB', type: 'batting', fixed: null, addedClass: null },
    { name: 'IBB', type: 'batting', fixed: null, addedClass: null },
    { name: 'HP', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: 'SH', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: 'SF', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: 'SO', type: 'batting', fixed: null, addedClass: cl.tall },
    { name: 'TB', type: 'batting', fixed: null, addedClass: cl.wide },
    { name: 'AVG', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'SLG', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'OBP', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'OPS', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'SB', type: 'running', fixed: null, addedClass: cl.tall, headerWrapped: true },
    { name: 'CS', type: 'running', fixed: null, addedClass: cl.tall },
    { name: 'SB_pr', type: 'running', fixed: null, addedClass: cl.wider, childField: '%SB' },
    { name: 'LOB', type: 'running', fixed: null, addedClass: null },
    { name: 'CH', type: 'fielding', fixed: null, addedClass: cl.wide, headerWrapped: true },
    { name: 'PO', type: 'fielding', fixed: null, addedClass: null, headerWrapped: true },
    { name: 'A', type: 'fielding', fixed: null, addedClass: null },
    { name: 'E', type: 'fielding', fixed: null, addedClass: cl.tall },
    { name: 'DP', type: 'fielding', fixed: null, addedClass: cl.tall },
    { name: 'FLD', type: 'fielding', fixed: 3, addedClass: cl.wider, childField: 'FLD%' },
    { name: 'G', type: 'pitching', fixed: null, addedClass: null },
    { name: 'GS', type: 'pitching', fixed: null, addedClass: null },
    { name: 'W', type: 'pitching', fixed: null, addedClass: null },
    { name: 'L', type: 'pitching', fixed: null, addedClass: null },
    { name: 'CG', type: 'pitching', fixed: null, addedClass: null },
    { name: 'SV', type: 'pitching', fixed: null, addedClass: null },
    { name: 'IP', type: 'pitching', fixed: null, addedClass: cl.wide2 },
    { name: 'PA', type: 'pitching', fixed: null, addedClass: cl.wide },
    { name: 'R', type: 'pitching', fixed: null, addedClass: null },
    { name: 'ER', type: 'pitching', fixed: null, addedClass: null },
    { name: 'H', type: 'pitching', fixed: null, addedClass: null },
    { name: '2B', type: 'pitching', fixed: null, addedClass: null },
    { name: '3B', type: 'pitching', fixed: null, addedClass: null },
    { name: 'HR', type: 'pitching', fixed: null, addedClass: null },
    { name: 'BB', type: 'pitching', fixed: null, addedClass: null },
    { name: 'IBB', type: 'pitching', fixed: null, addedClass: null },
    { name: 'HP', type: 'pitching', fixed: null, addedClass: null },
    { name: 'SH', type: 'pitching', fixed: null, addedClass: null },
    { name: 'SF', type: 'pitching', fixed: null, addedClass: null },
    { name: 'SO', type: 'pitching', fixed: null, addedClass: null },
    { name: 'WP', type: 'pitching', fixed: null, addedClass: null },
    { name: 'BK', type: 'pitching', fixed: null, addedClass: null },
    { name: 'ERA', type: 'pitching', fixed: 3, addedClass: cl.wide3 },
    { name: 'NP', type: 'pitching', fixed: null, addedClass: cl.wide },
    { name: 'NS', type: 'pitching', fixed: null, addedClass: cl.wide },
    { name: 'NB', type: 'pitching', fixed: null, addedClass: cl.wide }
  ];

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
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          AB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
          R
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
          H
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          2B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          3B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          HR
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          RBI
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wide2}>
          GDP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
          BB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wide2}>
          IBB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          HP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : null}>
          SH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          SF
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
          SO
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
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
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : null}>
          GS
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : null}>
          W
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : null}>
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
          arrowStyles={arrowStyles}
          addedClass={cl.tall}>
          SV
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide3}>
          IP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          PA
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          R
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? null : cl.wide2_5}>
          ER
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          H
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : null}>
          2B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : null}>
          3B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.tall}>
          HR
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          BB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.tall}>
          IBB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.tall : null}>
          HP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.tall}>
          SH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.tall}>
          SF
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
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
          arrowStyles={arrowStyles}
          addedClass={cl.tall}>
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
          addedClass={statsType === 'player' ? cl.wide2_5 : cl.wide3}>
          NP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide3}>
          NS
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide3}>
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
          arrowStyles={arrowStyles}
          addedClass={cl.wide2_5}>
          CH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wide2_5}>
          PO
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wide2_5}>
          A
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wide2_5}>
          E
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wide2_5}>
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
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          AB
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
          R
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
          H
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          2B
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          3B
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          HR
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          RBI
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2}>
          GDP
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
          BB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2}>
          IBB
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          HP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={statsType === 'player' ? cl.tall : null}>
          SH
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          SF
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
          SO
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2_5}>
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
        <ActiveBodyCell sortField={sortField} row={row} addedClass={statsType === 'player' ? cl.tall : null}>
          GS
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={statsType === 'player' ? cl.tall : null}>
          W
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={statsType === 'player' ? cl.tall : null}>
          L
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          CG
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          SV
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          fixed={1}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide3}>
          IP
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          PA
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          R
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? null : cl.wide2_5}>
          ER
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
          H
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={statsType === 'player' ? cl.tall : null}>
          2B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={statsType === 'player' ? cl.tall : null}>
          3B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          HR
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.tall : cl.wide2}>
          BB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          IBB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={statsType === 'player' ? cl.tall : null}>
          HP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          SH
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
          SF
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide2_5}>
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
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2_5 : cl.wide3}>
          NP
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide3}>
          NS
        </ActiveBodyCell>
        <ActiveBodyCell
          sortField={sortField}
          row={row}
          addedClass={statsType === 'player' ? cl.wide2 : cl.wide3}>
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
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          CH
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          PO
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          A
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
          E
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide2_5}>
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
