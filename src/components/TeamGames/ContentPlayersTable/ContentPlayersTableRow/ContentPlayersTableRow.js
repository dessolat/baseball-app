import React from 'react';
import RowPlayerHands from './RowPlayerHands';
import RowPlayerName from './RowPlayerName';

const ContentPlayersTableRow = ({ player, index, cl }) => (
  <li key={index} className={cl.tableRow}>
    <div>{index + 1}</div>
    <RowPlayerName player={player} nameClass={cl.underlineHover} />
    <div>{player.pos ?? '—'}</div>
    <RowPlayerHands player={player} />
    <div>{player.height}</div>
    <div>{player.weight}</div>
    <div>{player.yob}</div>
  </li>
);

export default ContentPlayersTableRow;
