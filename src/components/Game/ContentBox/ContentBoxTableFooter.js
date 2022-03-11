import React from 'react';

const ContentBoxTableFooter = ({ TABLES_INFO, tableName, tableData, toFixList }) => {
  const getFieldSum = (table, field) =>
    table === 'fielding'
      ? tableData.reduce((sum, cur) => sum + Number(cur.content[table][field]), 0)
      : table === 'catching'
      ? tableData
          .filter(player => player.is_catcher)
          .reduce((sum, cur) => sum + Number(cur.content['running'][field]), 0)
      : tableData.reduce((sum, cur) => sum + Number(cur.content[table][field]), 0);

  return (
    <tfoot>
      <tr
        style={
          tableData.filter(player =>
            tableName === 'pitching' ? player.is_pitcher : tableName === 'catching' ? player.is_catcher : true
          ).length % 2
            ? { backgroundColor: '#eaeaea' }
            : {}
        }>
        <td></td>
        <td>TOTALS</td>
        {TABLES_INFO[tableName].headers.map((title, i) => (
          <td key={i}>
            {title === 'PB'
              ? '--'
              : title === 'POS'
              ? ' '
              : title === 'SB_pr'
              ? getFieldSum('running', title).toFixed(3)
              : title === 'FLD'
              ? getFieldSum('fielding', title).toFixed(3)
              : ['CH', 'PO', 'A', 'E', 'DP'].includes(title)
              ? getFieldSum('fielding', title)
              : toFixList.includes(title)
              ? getFieldSum(tableName, title).toFixed(3)
              : getFieldSum(
                  ['SB', 'CS', 'LOB'].includes(title) && tableName !== 'catching' ? 'running' : tableName,
                  title
                )}
          </td>
        ))}
      </tr>
    </tfoot>
  );
};

export default ContentBoxTableFooter;
