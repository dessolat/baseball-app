import React from 'react';
import cl from './ContentBoxTable.module.scss';
import ContentBoxTableHeader from './ContentBoxTableHeader';

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
      'LOB',
      'CH',
      'PO',
      'A',
      'E',
      'DP',
      'FLD'
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

const ContentBoxTable = ({ tableData, tableClass, tableName, toFixList = [] }) => {
  const getFieldSum = (table, field) =>
    table === 'fielding'
      ? tableData.reduce((sum, cur) => sum + Number(cur.content[table][field]), 0)
      : table === 'catching'
      ? tableData
          .filter(player => player.is_catcher)
          .reduce((sum, cur) => sum + Number(cur.content['running'][field]), 0)
      : tableData.reduce((sum, cur) => sum + Number(cur.content[table][field]), 0);

  let rowDelta = 0;
  return (
    <table className={cl.table + ' ' + tableClass}>
      <ContentBoxTableHeader TABLES_INFO={TABLES_INFO} tableName={tableName} />
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
                <td
                  style={player.is_substituted && tableName === 'batting' ? { paddingLeft: '2.5rem' } : null}>
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
      <tfoot>
        <tr
          style={
            tableData.filter(player =>
              tableName === 'pitching'
                ? player.is_pitcher
                : tableName === 'catching'
                ? player.is_catcher
                : true
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
    </table>
  );
};

export default ContentBoxTable;
