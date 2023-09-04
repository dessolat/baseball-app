import React from 'react';
import { Link } from 'react-router-dom';
import ContentBoxTableBodyCell from './ContentBoxTableBodyCell';

const ContentBoxTableBodyRow = ({ player, TABLES_INFO, toFixList, rowIndex, tableName, rowDelta }) => (
  <tr>
    <td>
      {(player.is_substituted && tableName === 'batting') || tableName !== 'batting'
        ? ' '
        : rowIndex + 1 - rowDelta}
    </td>
    <td style={player.is_substituted && tableName === 'batting' ? { paddingLeft: '2.5rem' } : null}>
      <Link to={`/stats/player/${player.id}`}>
        {tableName === 'batting' ? player.content.name : player.name}
      </Link>
    </td>
    {TABLES_INFO[tableName].headers.map((title, i) => (
      <ContentBoxTableBodyCell
        key={i}
        title={title}
        toFixList={toFixList}
        player={player}
        tableName={tableName}
      />
    ))}
  </tr>
);

export default ContentBoxTableBodyRow;
