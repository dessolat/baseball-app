import React from 'react';
import ContentBoxTableFooterCell from './ContentBoxTableFooterCell';

const ContentBoxTableFooter = ({ TABLES_INFO, tableName, tableData, orderedPlayersStats, toFixList }) => {
  const footerStyles =
    orderedPlayersStats.filter(player =>
      tableName === 'pitching' ? player.takenBy : tableName === 'catching' ? player.is_catcher : true
    ).length % 2
      ? { backgroundColor: '#eaeaea' }
      : {};

  return (
    <tfoot>
      <tr style={footerStyles}>
        <td></td>
        <td>TOTALS</td>
        {TABLES_INFO[tableName].headers.map((title, i) => (
          <ContentBoxTableFooterCell
            key={i}
            title={title}
            toFixList={toFixList}
            tableName={tableName}
            tableData={tableData}
          />
        ))}
      </tr>
    </tfoot>
  );
};

export default ContentBoxTableFooter;
