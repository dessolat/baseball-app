import React from 'react';
import { Link } from 'react-router-dom';

const ContentBoxTableBody = ({ TABLES_INFO, tableName, tableData, toFixList }) => {
  let rowDelta = 0;

  const orderedPlayersStats = tableData.players_stats.slice();

  tableName === 'pitching' &&
    tableData.pitchers_order.forEach((orderId, i) => {
      orderedPlayersStats.find(player => player.id === orderId).order = i + 1;
    });

  return (
    <tbody>
      {orderedPlayersStats
        .filter(player =>
          tableName === 'pitching' ? player.is_pitcher : tableName === 'catching' ? player.is_catcher : true
        )
        .sort((a, b) => (tableName === 'pitching' ? (a.order > b.order ? 1 : -1) : 0))
        .map((player, i) => {
          if (player.is_substituted && tableName === 'batting') rowDelta++;
          return (
            <tr key={i}>
              <td>
                {(player.is_substituted && tableName === 'batting') || tableName !== 'batting'
                  ? ' '
                  : i + 1 - rowDelta}
              </td>
              <td style={player.is_substituted && tableName === 'batting' ? { paddingLeft: '2.5rem' } : null}>
                <Link to={`/stats/player/${player.id}`}>{player.content.player_name}</Link>
              </td>
              {TABLES_INFO[tableName].headers.map((title, i) => (
                <td key={i} style={toFixList.includes(title) ? { width: '3rem' } : null}>
                  {title === 'POS'
                    ? player.content.position.join('/')
                    : ['SB', 'CS', 'SB_pr', 'LOB', 'PB'].includes(title)
                    ? player.content.stat[tableName === 'batting' ? 'running' : 'catching'][title]
                    : ['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title)
                    ? player.content.stat.fielding[title]
                    : toFixList.includes(title)
                    ? player.content.stat[tableName][title] === 'INF'
                      ? 'INF'
                      : Number(player.content.stat[tableName][title]).toFixed(3)
                    : player.content.stat[tableName][title]}
                </td>
              ))}
            </tr>
          );
        })}
    </tbody>
  );
};

export default ContentBoxTableBody;
