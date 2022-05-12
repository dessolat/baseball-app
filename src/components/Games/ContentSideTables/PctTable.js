import React, { useMemo } from 'react';
import { getShortName } from 'utils';
import cl from './ContentSideTables.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PctTable = ({ currentLeague }) => {
	const isMobile = useSelector(state => state.shared.isMobile)
	const currentGameType = useSelector(state => state.shared.currentGameType)

  const sortedTeams = useMemo(
    () =>
      currentLeague.teams
        .sort((a, b) => (a.pct > b.pct ? -1 : 1)),
        // .sort((a, b) => (a.wins === b.wins && a.loses < b.loses ? -1 : 1)),
    [currentLeague.teams]
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
                <Link to={`/games/team/${currentGameType.toLowerCase()}/${team.name}`}> {getShortName(team.name, isMobile ? 30 : 23)}</Link>
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
