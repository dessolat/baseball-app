import React from 'react';
import { Link } from 'react-router-dom';

const ContentBoxTableBodyRow = ({player,TABLES_INFO,toFixList,rowIndex,tableName,rowDelta}) => {
  return (
    <tr>
      <td>
        {(player.is_substituted && tableName === 'batting') || tableName !== 'batting'
          ? ' '
          : rowIndex + 1 - rowDelta}
      </td>
      <td style={player.is_substituted && tableName === 'batting' ? { paddingLeft: '2.5rem' } : null}>
        <Link to={`/stats/player/${player.id}`}>{player.content.name}</Link>
      </td>
      {TABLES_INFO[tableName].headers.map((title, i) => {
        const value =
          title === 'POS'
            ? player.content.positions.join('/')
            : ['SB', 'CS', 'SB_pr', 'LOB', 'PB'].includes(title)
            ? player.content.stats[tableName === 'batting' ? 'running' : 'catching'][title]
            : ['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title)
            ? player.content.stats.fielding[title]
            : toFixList.includes(title)
            ? player.content.stats[tableName][title] === 'Infinity'
              ? 'INF'
              : Number(player.content.stats[tableName][title]).toFixed(3)
            : player.content.stats[tableName][title];

        return (
          <td key={i} style={toFixList.includes(title) ? { width: '3rem' } : null}>
            {Number(value) < 0 ? '—' : value}
          </td>
        );
      })}
    </tr>
  );
};

export default ContentBoxTableBodyRow;
