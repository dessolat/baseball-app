import React from 'react';
import ContentBoxTableBodyRow from './ContentBoxTableBodyRow';

const ContentBoxTableBody = ({ TABLES_INFO, tableName, tableData, toFixList }) => {
  let rowDelta = 0;

  const orderedPlayersStats = tableData.players_stats.slice();

  tableName === 'pitching' &&
    tableData.pitchers_order.forEach((orderId, i) => {
      const player = orderedPlayersStats.find(player => player.id === orderId);

      if (player !== undefined) {
        player.order = i + 1;
      }
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
            <ContentBoxTableBodyRow
              key={i}
              player={player}
              TABLES_INFO={TABLES_INFO}
              toFixList={toFixList}
              rowIndex={i}
              tableName={tableName}
              rowDelta={rowDelta}
            />
          );
        })}
    </tbody>
  );
};

export default ContentBoxTableBody;
