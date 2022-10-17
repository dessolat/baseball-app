import React from 'react';
import ContentBoxTableBodyRow from './ContentBoxTableBodyRow';

const ContentBoxTableBody = ({ TABLES_INFO, tableName, orderedPlayersStats, toFixList }) => {
  let rowDelta = 0;

  

  // tableName === 'pitching' &&
  //   tableData.pitchers_order.forEach((orderId, i) => {
  //     const player = orderedPlayersStats.find(
  //       player => player.id === orderId && player.is_pitcher && !player.order
  //     );

  //     if (player !== undefined) {
  //       player.order = i + 1;
  //     }
  //   });

  return (
    <tbody>
      {orderedPlayersStats
        // {(tableName !== 'pitching' ? orderedPlayersStats : players)
        .filter(
          player =>
            tableName === 'pitching' ? player.takenBy : tableName === 'catching' ? player.is_catcher : true
          // tableName === 'pitching' ? player.is_pitcher : tableName === 'catching' ? player.is_catcher : true
        )
        .slice()
        .sort((a, b) => (tableName === 'pitching' ? (a.takenBy > b.takenBy ? 1 : -1) : 0))
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
