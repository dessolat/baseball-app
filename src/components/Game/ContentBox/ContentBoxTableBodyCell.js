import React from 'react';

const ContentBoxTableBodyCell = ({ title, toFixList, player, tableName }) => {
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
    <td style={toFixList.includes(title) ? { width: '3rem' } : null}>{Number(value) < 0 ? '—' : value}</td>
  );
};

export default ContentBoxTableBodyCell;
