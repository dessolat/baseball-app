import React from 'react';
import ContentBoxTableBodyRow from './ContentBoxTableBodyRow';

const ContentBoxTableBody = ({ TABLES_INFO, tableName, orderedPlayersStats, toFixList }) => {
  const { pitchers, catchers, players_stats: playersStats } = orderedPlayersStats;
  let rowDelta = 0;

  const playersArr =
    tableName === 'pitching' ? pitchers : tableName === 'catching' ? catchers : playersStats;

  return (
    <tbody>
      {playersArr
        // .filter(player =>
        //   tableName === 'pitching' ? player.takenBy : tableName === 'catching' ? player.is_catcher : true
        // )
        // .sort((a, b) => (tableName === 'pitching' ? (a.takenBy > b.takenBy ? 1 : -1) : 0))
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
