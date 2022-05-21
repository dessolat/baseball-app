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
      <table className={cl.pctTable}>
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>PCT</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map(team => (
            <tr key={team.id}>
              <td className={cl.underlineHover}>
                <Link to={`/games/team/${currentGameType.toLowerCase()}/${team.name}`}>
                  {' '}
                  {getShortName(team.name, isMobile ? 30 : 23)}
                </Link>
              </td>
              <td>{team.wins}</td>
              <td>{team.loses}</td>
              <td>{team.pct !== -1 ? team.pct : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PctTable;
