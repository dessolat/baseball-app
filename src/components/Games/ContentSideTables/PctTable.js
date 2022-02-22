import React from 'react';
import cl from './ContentSideTables.module.scss';

const PctTable = ({ currentLeague }) => {
  const getShortName = (name, length) => (name.length > length ? name.slice(0, length - 1) + '…' : name);

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
        {currentLeague.teams.map(team => (
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
