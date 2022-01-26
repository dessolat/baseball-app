import React from 'react';
import cl from './ContentBoxTable.module.scss';

const ContentBoxTable = ({ tableData, tableClass, footerOffset, toFixList = [] }) => {
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
            {Object.entries(player).map((entry, j) => (
              <td key={j}>{toFixList.includes(entry[0]) ? entry[1].toFixed(3) : entry[1]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr style={tableData.length % 2 ? { backgroundColor: '#eaeaea' } : {}}>
          <td></td>
          <td>TOTALS</td>
          {footerOffset > 1 && <td></td>}
          {Object.entries(tableData[0])
            .slice(footerOffset)
            .map((entry, j) => (
              <td key={j} style={toFixList.includes(entry[0]) ? { width: '3rem' } : null}>
                {toFixList.includes(entry[0]) ? entry[1].toFixed(3) : entry[1]}
              </td>
            ))}
        </tr>
      </tfoot>
    </table>
  );
};

export default ContentBoxTable;
