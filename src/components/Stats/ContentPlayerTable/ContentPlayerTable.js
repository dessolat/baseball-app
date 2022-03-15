import React from 'react';
import cl from './ContentPlayerTable.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getObjectsSum } from 'utils';

const ContentPlayerTable = () => {
  const tableMode = useSelector(state => state.stats.tableMode);
  const statsData = useSelector(state => state.stats.statsData);
  const currentLeague = useSelector(state => state.shared.currentLeague);

  const tableHeaders =
    tableMode === 'Batting' ? (
      <>
        <div>AB</div>
        <div>H</div>
        <div>1B</div>
        <div>2B</div>
        <div>3B</div>
        <div>HR</div>
        <div>RBI</div>
        <div>GDP</div>
        <div>BB</div>
        <div>HP</div>
        <div>SH</div>
        <div>SF</div>
        <div>SO</div>
        <div>TB</div>
        <div className={cl.wider}>AVG</div>
        <div className={cl.wider}>SLG</div>
        <div className={cl.wider}>OBP</div>
        <div className={cl.wider}>OPS</div>
      </>
    ) : tableMode === 'Fielding' ? (
      <>
        <div>A</div>
        <div>CH</div>
        <div>DP</div>
        <div>E</div>
        <div className={cl.wider}>FLD</div>
        <div>PO</div>
      </>
    ) : tableMode === 'Pitching' ? (
      <>
        <div>2B</div>
        <div>3B</div>
        <div>BB</div>
        <div>BK</div>
        <div>ER</div>
        <div className={cl.wider}>ERA</div>
        <div>H</div>
        <div>HP</div>
        <div>HR</div>
        <div>IBB</div>
        <div>IP</div>
        <div>NB</div>
        <div>NP</div>
        <div>NS</div>
        <div>PA</div>
        <div>R</div>
        <div>SF</div>
        <div>SH</div>
        <div>SO</div>
        <div>WP</div>
      </>
    ) : (
      <>
        <div>CS</div>
        <div>LOB</div>
        <div>R</div>
        <div>SB</div>
        <div className={cl.wider}>SB_pr</div>
      </>
    );

  const tableRows = row =>
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
      ? statsData.find(item => item.title === currentLeague.name).players[tableMode.toLowerCase()]
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
          <div>Team</div>
          {tableHeaders}
        </div>
        <ul className={cl.rows}>
          {filteredStatsData.map((row, index) => {
            return (
              <li key={index} className={cl.tableRow}>
                <div>
                  <Link to={`/stats/player/${row.name}/${row.name}`}> {row.name}</Link>
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
                {tableRows(row)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ContentPlayerTable;
