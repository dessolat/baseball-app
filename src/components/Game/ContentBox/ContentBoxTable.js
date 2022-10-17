import React from 'react';
import cl from './ContentBoxTable.module.scss';
import ContentBoxTableBody from './ContentBoxTableBody';
import ContentBoxTableFooter from './ContentBoxTableFooter';
import ContentBoxTableHeader from './ContentBoxTableHeader';

const TABLES_INFO = {
  batting: {
    headers: [
      'POS',
      'AB',
      'R',
      'H',
      '2B',
      '3B',
      'HR',
      'RBI',
      'GDP',
      'BB',
      'IBB',
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
      'IP',
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
      'BK',
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
	const orderedPlayersStats = JSON.parse(JSON.stringify(tableData.players_stats));

  if (tableName === 'pitching') {
    orderedPlayersStats.sort((a, b) => (a.order > b.order ? 1 : -1));

    tableData.pitchers_order.forEach((orderId, i) => {
      const player = orderedPlayersStats.find(
        curPlayer => curPlayer.id === orderId && curPlayer.is_pitcher && curPlayer.takenBy === undefined
      );

      if (player !== undefined) {
        player.takenBy = i + 1;
      }
    });
  }
	
  console.log(orderedPlayersStats);
  return (
    <table className={cl.table + ' ' + tableClass}>
      <ContentBoxTableHeader TABLES_INFO={TABLES_INFO} tableName={tableName} />
      <ContentBoxTableBody
        TABLES_INFO={TABLES_INFO}
        tableName={tableName}
        toFixList={toFixList}
				orderedPlayersStats={orderedPlayersStats}
      />
      <ContentBoxTableFooter
        TABLES_INFO={TABLES_INFO}
        tableName={tableName}
        tableData={tableData}
				orderedPlayersStats={orderedPlayersStats}

        toFixList={toFixList}
      />
    </table>
  );
};

export default ContentBoxTable;
