import React from 'react';

const ContentBoxTableFooterCell = ({title, toFixList, tableName, tableData}) => (
  <td>
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
);

export default ContentBoxTableFooterCell;
