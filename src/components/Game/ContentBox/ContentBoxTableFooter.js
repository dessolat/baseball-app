import React from 'react';
import ContentBoxTableFooterCell from './ContentBoxTableFooterCell';

const ContentBoxTableFooter = ({ TABLES_INFO, tableName, tableData, toFixList }) => {
  const {
    catchers,
    pitchers,
    total_stats: { batting }
  } = tableData;

  function getTableGroup() {
    if (tableName === 'pitching') return pitchers;
    if (tableName === 'catching') return catchers;
    return batting;
  }

  const footerStyles = getTableGroup().length % 2 ? { backgroundColor: '#eaeaea' } : {};
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
