import React from 'react';
import cl from './ContentBoxTable.module.scss';

const TABLES_INFO = {
  batting: {
    headers: [
      'POS',
      'AB',
      'H',
      '2B',
      '3B',
      'HR',
      'RBI',
      'GDP',
      'BB',
      'HP',
      'SH',
      'SF',
      'SO',
      'TB',
      'AVG',
      'SLG',
      'OBP',
      'OPS',
      'SB',
      'CS',
      'SB_pr',
      'LOB'
    ]
  },
  pitching: {
    headers: [
      'PA',
      'R',
      'ER',
      'H',
      '2B',
      '3B',
      'HR',
      'BB',
      'IBB',
      'HP',
      'SH',
      'SF',
      'SO',
      'WP',
      'ERA',
      'NP',
      'NS',
      'NB'
    ]
  },
  fielding: {
    headers: ['CH', 'PO', 'A', 'E', 'DP', 'FLD']
  },
  catching: {
    headers: ['SB', 'CS', 'PB']
  }
};

const ContentBoxTable = ({ tableData, tableClass, tableName, footerOffset, toFixList = [] }) => {
  const getFieldSum = (table, field) =>
    table === 'fielding'
      ? tableData
          .filter(player => player.is_catcher)
          .reduce((sum, cur) => sum + Number(cur.content[table][field]), 0)
      : table === 'catching'
      ? tableData
          .filter(player => player.is_catcher)
          .reduce((sum, cur) => sum + Number(cur.content['running'][field]), 0)
      : tableData.reduce((sum, cur) => sum + Number(cur.content[table][field]), 0);
  return (
    <table className={cl.table + ' ' + tableClass}>
      <thead>
        <tr>
          <th></th>
          <th></th>
          {TABLES_INFO[tableName].headers.map((title, i) => (
            <th key={i}>{title === 'SB_pr' ? '%SB' : title === 'FLD' ? 'FLD%' : title}</th>
          ))}
          {/* {Object.keys(tableData[0])
            .slice(1)
            .map((title, i) => (
              <th key={i}>{title.toUpperCase()}</th>
            ))} */}
        </tr>
      </thead>
      <tbody>
        {tableData
          .filter(player =>
            tableName === 'pitching'
              ? player.is_pitcher
              : tableName === 'catching' || tableName === 'fielding'
              ? player.is_catcher
              : true
          )
          .map((player, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{player.content.player_name}</td>
              {TABLES_INFO[tableName].headers.map((title, i) => (
                <td key={i} style={toFixList.includes(title) ? { width: '3rem' } : null}>
                  {title === 'POS'
                    ? player.content.position[0]
                    : ['SB', 'CS', 'SB_pr', 'LOB'].includes(title)
                    ? player.content.running[title]
                    : title === 'PB'
                    ? '--' :
										toFixList.includes(title) ? Number(player.content[tableName][title]).toFixed(3)
                    : player.content[tableName][title]}
                </td>
              ))}
              {/* {Object.entries(player).map((entry, j) => (
              <td key={j}>{toFixList.includes(entry[0]) ? entry[1].toFixed(3) : entry[1]}</td>
            ))} */}
            </tr>
          ))}
        {/* {tableData.map((player, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            {Object.entries(player).map((entry, j) => (
              <td key={j}>{toFixList.includes(entry[0]) ? entry[1].toFixed(3) : entry[1]}</td>
            ))}
          </tr>
        ))} */}
      </tbody>
      <tfoot>
        {/* <tr style={tableData.length % 2 ? { backgroundColor: '#eaeaea' } : {}}>
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
        </tr> */}
      </tfoot>
    </table>
  );
};

export default ContentBoxTable;
