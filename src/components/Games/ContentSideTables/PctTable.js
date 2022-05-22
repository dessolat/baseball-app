import React, { useMemo } from 'react';
import { getShortName } from 'utils';
import cl from './ContentSideTables.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PctTable = ({ currentLeague }) => {
  const leagues = useSelector(state => state.games.leagues);
  const isMobile = useSelector(state => state.shared.isMobile);
  const currentGameType = useSelector(state => state.shared.currentGameType);

  const leagueTeams = leagues
    .slice()
    .find(league =>
      currentLeague.id === undefined
        ? league.name === currentLeague.name || league.name === currentLeague.title
        : league.id === currentLeague.id
    )?.teams;
  const sortedTeams = useMemo(
    () =>
      leagueTeams
        ? leagueTeams.sort((a, b) => (a.wins > b.wins || (a.wins === b.wins && a.loses < b.loses) ? -1 : 1))
        : [],
    [leagueTeams]
  );

  return (
    <div className={cl.pctWrapper}>
      <div className={cl.header}>
        <Link to='/stats/team'>Go to Team Stat</Link>
      </div>
      <div className={cl.pctTable}>
        <div className={cl.tableHeader}>
          <div>Team</div>
          <div>
            <div>W</div>
            <div>L</div>
            <div>PCT</div>
          </div>
        </div>
        <div className={cl.tableBody}>
          {sortedTeams.map(team => (
            <div key={team.id} className={cl.tableRow}>
              <div className={cl.underlineHover}>
                <Link to={`/games/team/${currentGameType.toLowerCase()}/${team.name}`}>
                  {' '}
                  {getShortName(team.name, isMobile ? 30 : 21)}
                </Link>
              </div>
              <div>
                <div>{team.wins}</div>
                <div>{team.loses}</div>
                <div>{team.pct !== -1 ? team.pct : '—'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PctTable;
