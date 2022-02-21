import React from 'react';
import cl from './ContentSideTables.module.scss';
import ArrowDown from 'components/UI/icons/ArrowDown';
import { useSelector } from 'react-redux';

const FIRST_TABLE_DATA = [
  { id: 1, name: 'RusStar Unost Moscow', w: '00', l: '00', pct: '0000' },
  { id: 2, name: 'RusStar Unost Moscow', w: '00', l: '00', pct: '0000' },
  { id: 3, name: 'RusStar Unost Moscow', w: '00', l: '00', pct: '0000' },
  { id: 4, name: 'RusStar Unost Moscow', w: '00', l: '00', pct: '0000' },
  { id: 5, name: 'RusStar Unost Moscow', w: '00', l: '00', pct: '0000' },
  { id: 6, name: 'RusStar Unost Moscow', w: '00', l: '00', pct: '0000' },
  { id: 7, name: 'RusStar Unost Moscow', w: '00', l: '00', pct: '0000' },
  { id: 8, name: 'RusStar Unost Moscow', w: '00', l: '00', pct: '0000' }
];

const SECOND_TABLE_DATA = [
  { id: 1, name: 'SURNAME Name', team: 'RusStar', avr: '0000' },
  { id: 2, name: 'SURNAME Name', team: 'RusStar', avr: '0000' },
  { id: 3, name: 'SURNAME Name', team: 'RusStar', avr: '0000' },
  { id: 4, name: 'SURNAME Name', team: 'RusStar', avr: '0000' },
  { id: 5, name: 'SURNAME Name', team: 'RusStar', avr: '0000' }
];

const ContentSideTables = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);

  const getShortName = name => (name.length > 23 ? name.slice(0, 22) + '…' : name);

  const isTables = currentLeague.id !== -1;
  return (
    <>
      <div className={cl.side} style={!isTables ? {height: '70vh'} : null}>
        {isTables && (
          <>
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
                    <td>{getShortName(team.name)}</td>
                    <td>{team.wins}</td>
                    <td>{team.loses}</td>
                    <td>0000</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={cl.drop}>
              Batting <ArrowDown />
            </p>
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
        )}
      </div>
    </>
  );
};

export default ContentSideTables;
