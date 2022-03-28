import React, { useMemo } from 'react';
import { getShortName } from 'utils';
import cl from './ContentSideTables.module.scss';
import { Link } from 'react-router-dom';

const PctTable = ({ currentLeague }) => {
  const sortedTeams = useMemo(
    () =>
      currentLeague.teams
        .sort((a, b) => (a.wins > b.wins ? -1 : 1))
        .sort((a, b) => (a.wins === b.wins && a.loses < b.loses ? -1 : 1)),
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
                <Link to={`/games/team/${team.name}`}> {getShortName(team.name, 23)}</Link>
              </td>
              <td>{team.wins}</td>
              <td>{team.loses}</td>
              <td>0000</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PctTable;
