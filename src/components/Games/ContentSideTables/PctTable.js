import React, { useMemo } from 'react';
import cl from './ContentSideTables.module.scss';

const PctTable = ({ currentLeague }) => {
  const getShortName = (name, length) => (name.length > length ? name.slice(0, length - 1) + '…' : name);

  const sortedTeams = useMemo(
    () =>
      currentLeague.teams
        .sort((a, b) => (a.wins > b.wins ? -1 : 1))
        .sort((a, b) => (a.wins === b.wins && a.loses < b.loses ? -1 : 1)),
    [currentLeague.teams]
  );

  return (
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
            <td>{getShortName(team.name, 23)}</td>
            <td>{team.wins}</td>
            <td>{team.loses}</td>
            <td>0000</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PctTable;
