import React from 'react';
import cl from './ContentSideTables.module.scss';
import ArrowDown from 'components/UI/icons/ArrowDown';
import { Link } from 'react-router-dom';

const SECOND_TABLE_DATA = [
  { id: 1, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 2, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 3, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 4, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 5, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 6, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 7, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 8, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 9, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 10, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 11, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' },
  { id: 12, name: 'Name', surname: 'SURNAME', team: 'RusStar', avr: '0000' }
];

const SwitchTable = () => {
  return (
    <div className={cl.switchWrapper}>
      <div className={cl.header}>
        <p className={cl.drop}>
          Batting <ArrowDown />
        </p>
        <Link to='/stats/player'>Go to Player Stat</Link>
      </div>
      <div className={cl.switchTable}>
        <div className={cl.tableHeader}>
          <div>Name</div>
          <div>
          <div>Team</div>
            <div className={cl.avr}>
              AVR 
              <ArrowDown />
            </div>
          </div>
        </div>
        <div className={cl.tableBody}>
          {SECOND_TABLE_DATA.map(row => (
            <div key={row.id} className={cl.tableRow}>
              <div className={cl.underlineHover}>
                <Link to={`/stats/player/${row.name}/${row.surname}`}>
                  {row.surname} {row.name}
                </Link>
              </div>
              <div>
                <div>{row.team}</div>
                <div>{row.avr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwitchTable;
