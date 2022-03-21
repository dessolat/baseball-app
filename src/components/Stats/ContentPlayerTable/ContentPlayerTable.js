import React, { useState, useMemo } from 'react';
import cl from './ContentPlayerTable.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getObjectsSum } from 'utils';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import SortField from 'components/UI/sortField/SortField';

const ContentPlayerTable = () => {
  const [currentTeam, setCurrentTeam] = useState('All');
  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('desc');

  const tableMode = useSelector(state => state.stats.tableMode);
  const statsData = useSelector(state => state.stats.statsData);
  const currentLeague = useSelector(state => state.shared.currentLeague);

  const handleTeamClick = team => setCurrentTeam(team);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const tableHeaders =
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

  const getTableRows = row =>
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
    ) : tableMode === 'Fielding' ? (
      <>
        <div>{row.A}</div>
        <div>{row.CH}</div>
        <div>{row.DP}</div>
        <div>{row.E}</div>
        <div className={cl.wider}>{Number(row.FLD).toFixed(3)}</div>
        <div>{row.PO}</div>
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
        <div>{row.CS}</div>
        <div>{row.LOB}</div>
        <div>{row.R}</div>
        <div>{row.SB}</div>
        <div className={cl.wider}>{Number(row.SB_pr).toFixed(3)}</div>
      </>
    );

  const filteredStatsData =
    currentLeague.id !== -1
      ? statsData.find(item => item.title === currentLeague.name)?.players[tableMode.toLowerCase()] || []
      : statsData.reduce((sum, league) => {
          league.players[tableMode.toLowerCase()].forEach(player => {
            const playerIndex = sum.findIndex(sumPlayer => sumPlayer.id === player.id);

            if (playerIndex !== -1) {
              sum[playerIndex] = getObjectsSum(sum[playerIndex], player, ['name', 'surname', 'teams', 'id']);
            } else {
              sum.push(player);
            }
          });

          return sum;
        }, []) || [];

  return (
    <div className={cl.wrapper}>
      <div>
        <div className={cl.tableHeader}>
          <div></div>
          <div>POS</div>
          <div>
            <Dropdown
              title={'Team'}
              options={teamOptions}
              currentOption={currentTeam}
              handleClick={handleTeamClick}
              listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
            />
          </div>
          {tableHeaders}
        </div>
        <ul className={cl.rows}>
          {filteredStatsData.map((row, index) => {
            return (
              <li key={index} className={cl.tableRow}>
                <div>
                  <Link to={`/stats/player/${row.name}/${row.surname}`}> {row.name} {row.surname}</Link>
                </div>
                <div>{index}</div>
                <div>
                  <Link to={`/games/team/${row.teams[0].name}`}>{row.teams[0].name}</Link>
                  {row.teams[1] && (
                    <>
                       / <Link to={`/games/team/${row.teams[1].name}`}>{row.teams[1].name}</Link>
                    </>
                  )}
                  {row.teams[2] && (
                    <>
                       / <Link to={`/games/team/${row.teams[2].name}`}>{row.teams[2].name}</Link>
                    </>
                  )}
                </div>
                {getTableRows(row)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ContentPlayerTable;
