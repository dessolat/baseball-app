import React from 'react';
import cl from './ContentSideTables.module.scss';
import ArrowDown from 'components/UI/icons/ArrowDown';
import { Link } from 'react-router-dom';

const SECOND_TABLE_DATA = [
  { id: 1, name: 'SURNAME Name', team: 'RusStar', avr: '0000' },
  { id: 2, name: 'SURNAME Name', team: 'RusStar', avr: '0000' },
  { id: 3, name: 'SURNAME Name', team: 'RusStar', avr: '0000' },
  { id: 4, name: 'SURNAME Name', team: 'RusStar', avr: '0000' },
  { id: 5, name: 'SURNAME Name', team: 'RusStar', avr: '0000' }
];

const SwitchTable = () => {
  return (
    <>
      <div className={cl.header}>
        <p className={cl.drop}>
          Batting <ArrowDown />
        </p>
        <Link to='/stats/player'>Go to Player Stat</Link>
      </div>
      <table className={cl.switchTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>
              <div className={cl.avr}>
                AVR 
                <ArrowDown />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {SECOND_TABLE_DATA.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.team}</td>
              <td>{row.avr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SwitchTable;
