import React from 'react';

const ContentBoxTableBody = ({ TABLES_INFO, tableName, tableData, toFixList }) => {
  let rowDelta = 0;

  return (
    <tbody>
      {tableData
        .filter(player =>
          tableName === 'pitching' ? player.is_pitcher : tableName === 'catching' ? player.is_catcher : true
        )
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
                {player.content.player_name}
              </td>
              {TABLES_INFO[tableName].headers.map((title, i) => (
                <td key={i} style={toFixList.includes(title) ? { width: '3rem' } : null}>
                  {title === 'POS'
                    ? player.content.position.join('/')
                    : ['SB', 'CS', 'SB_pr', 'LOB'].includes(title)
                    ? player.content.running[title]
                    : ['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title)
                    ? player.content.fielding[title]
                    : title === 'PB'
                    ? '--'
                    : toFixList.includes(title)
                    ? Number(player.content[tableName][title]).toFixed(3)
                    : player.content[tableName][title]}
                </td>
              ))}
            </tr>
          );
        })}
    </tbody>
  );
};

export default ContentBoxTableBody;
