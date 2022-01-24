import React from 'react';
import cl from './ContentBoxTable.module.scss';

const ContentBoxTable = ({ tableData, tableClass, footerOffset }) => {
  return (
    <table className={cl.table + ' ' + tableClass}>
      <thead>
        <tr>
          <th></th>
          <th></th>
          {Object.keys(tableData[0])
            .slice(1)
            .map((title, i) => (
              <th key={i}>{title.toUpperCase()}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((player, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            {Object.values(player).map((value, j) => (
              <td key={j}>{j >= 15 && j <= 18 ? value.toFixed(3) : value}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr style={tableData.length % 2 ? {lineHeight: '1.5rem', backgroundColor: '#eaeaea'} : {}}>
          <td></td>
          <td>TOTALS</td>
          {footerOffset > 1 && <td></td>}
          {Object.values(tableData[0])
            .slice(footerOffset)
            .map((value, j) => (
              <td key={j}>{j >= 15 - footerOffset && j <= 18 - footerOffset ? value.toFixed(3) : value}</td>
            ))}
        </tr>
      </tfoot>
    </table>
  );
};

export default ContentBoxTable;
