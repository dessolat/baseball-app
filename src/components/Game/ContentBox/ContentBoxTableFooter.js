import React from 'react';

const ContentBoxTableFooter = ({ TABLES_INFO, tableName, tableData, toFixList }) => {
  return (
    <tfoot>
      <tr
        style={
          tableData.players_stats.filter(player =>
            tableName === 'pitching' ? player.is_pitcher : tableName === 'catching' ? player.is_catcher : true
          ).length % 2
            ? { backgroundColor: '#eaeaea' }
            : {}
        }>
        <td></td>
        <td>TOTALS</td>
        {TABLES_INFO[tableName].headers.map((title, i) => (
          <td key={i}>
            {title === 'POS'
              ? ' '
              : title === 'SB_pr'
              ? tableData.total_stats.running.SB_pr
              : title === 'FLD'
              ? Number(tableData.total_stats.fielding.FLD).toFixed(3)
              : ['CH', 'PO', 'A', 'E', 'DP'].includes(title)
              ? tableData.total_stats.fielding[title]
              : toFixList.includes(title)
              ? Number(tableData.total_stats[tableName][title]).toFixed(3)
              : ['SB', 'CS', 'LOB', 'PB'].includes(title)
              ? tableData.total_stats[tableName === 'batting' ? 'running' : 'catching'][title]
              : tableData.total_stats[tableName][title]}
          </td>
        ))}
      </tr>
    </tfoot>
  );
};

export default ContentBoxTableFooter;
