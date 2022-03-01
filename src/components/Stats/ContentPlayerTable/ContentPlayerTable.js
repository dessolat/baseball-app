import React from 'react';
import cl from './ContentPlayerTable.module.scss';
import { Link } from 'react-router-dom';

const TABLE_DATA = [
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  },
  {
    player_name: 'SURNAME Name',
    pos: '00',
    team_name: 'Name Team',
    ab: 0,
    h: 0,
    '2b': 0,
    '3b': 0,
    hr: 0,
    rbi: 0,
    gdp: 0,
    bb: 0,
    hp: 0,
    sh: 0,
    sf: 0,
    so: 0,
    tb: 0,
    avg: 0.0,
    slg: 0.0,
    obp: 0.0,
    ops: 0.0
  }
];

const ContentPlayerTable = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.table}>
        <div className={cl.tableHeader}>
          <div> </div>
          <div>POS</div>
          <div>Team</div>
          <div>AB</div>
          <div>H</div>
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
          <div>AVG</div>
          <div>SLG</div>
          <div>OBP</div>
          <div>OPS</div>
        </div>
        <ul className={cl.rows}>
          {TABLE_DATA.map((row, index) => (
            <li key={index} className={cl.tableRow}>
              <div>{row.player_name}</div>
              <div>{row.pos}</div>
              <div>
                <Link to={`/games/team/${row.team_name}`}> {row.team_name}</Link>
              </div>
              <div>{row.ab}</div>
              <div>{row.h}</div>
              <div>{row['2b']}</div>
              <div>{row['3b']}</div>
              <div>{row.hr}</div>
              <div>{row.rbi}</div>
              <div>{row.gdp}</div>
              <div>{row.bb}</div>
              <div>{row.hp}</div>
              <div>{row.sh}</div>
              <div>{row.sf}</div>
              <div>{row.so}</div>
              <div>{row.tb}</div>
              <div>{row.avg.toFixed(3)}</div>
              <div>{row.slg.toFixed(3)}</div>
              <div>{row.obp.toFixed(3)}</div>
              <div>{row.ops.toFixed(3)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentPlayerTable;
