import React from 'react';

// const getCellValue = (param, tableData) =>
//   ({
//     POS: ' ',
//     SB_pr: tableData.total_stats.running.SB_pr,
//     FLD: Number(tableData.total_stats.fielding.FLD).toFixed(3)
//   }[param]);

const ContentBoxTableFooterCell = ({ title, toFixList, tableName, tableData }) => {
	console.log(tableName);
	console.log(tableData);
	console.log(title);
  const getValue = () => {
    if (title === 'POS') return ' ';

    if (tableName === 'batting') {
      if (['SB_pr', 'LOB', 'CS', 'SB'].includes(title)) {
				return tableData.total_stats.fielding[title]
      }
      if ([('CH', 'PO', 'A', 'E', 'DP')].includes(title)) {
				console.warn('here')
				return tableData.total_stats.running[title]
      }
    }
  };
  return (
    <td>
      {
        getValue()
        // title === 'POS'
        //   ? ' '
        //   : title === 'SB_pr'
        //   ? tableData.total_stats.running.SB_pr
        //   : title === 'FLD'
        //   ? Number(tableData.total_stats.fielding.FLD).toFixed(3)
        //   : [('CH', 'PO', 'A', 'E', 'DP')].includes(title)
        //   ? tableData.total_stats.fielding[title]
        //   : toFixList.includes(title)
        //   ? Number(tableData.total_stats[tableName][title]).toFixed(3)
        //   : ['SB', 'CS', 'LOB', 'PB'].includes(title)
        //   ? tableData.total_stats[tableName === 'batting' ? 'running' : 'catching'][title]
        //   : tableData.total_stats[tableName][title]
      }
    </td>
  );
};

export default ContentBoxTableFooterCell;
