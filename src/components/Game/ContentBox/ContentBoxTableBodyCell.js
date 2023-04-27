import React from 'react';

const ContentBoxTableBodyCell = ({ title, toFixList, player, tableName }) => {
  // console.log(title);
  // console.log(player);
  // console.log(tableName);

  const getValue = () => {
    if (player.id === -1) return ' ';
    if (title === 'POS') return player.content.positions.join('/');

    if (tableName === 'batting') {
      if (player.content.stats[tableName][title] === 'Infinity') return 'INF';
      
      if (['SB_pr', 'LOB', 'CS', 'SB'].includes(title)) {
				if (toFixList.includes(title)) return Number(player.content.stats.running[title]).toFixed(3);
        return player.content.stats.running[title];
      }
      if (['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title)) {
				if (toFixList.includes(title)) return Number(player.content.stats.fielding[title]).toFixed(3);
				return player.content.stats.fielding[title];
      }

			if (toFixList.includes(title)) return Number(player.content.stats[tableName][title]).toFixed(3);

      return player.content.stats[tableName][title];
    }

    if (tableName === 'pitching') {
      if (player.pitching === null) return ' ';
      if (toFixList.includes(title)) return Number(player.pitching[title]).toFixed(3);
      return player.pitching[title];
    }

    if (tableName === 'catching') {
      if (['SB', 'CS', 'PB'].includes(title)) return player.catching[title];
    }

    return ' ';
  };

  // const value =
  //   player.id === -1
  //     ? ' '
  //     : title === 'POS'
  //     ? player.content.positions.join('/')
  //     : ['SB', 'CS', 'PB'].includes(title)
  //     ? player[title]
  //     : ['SB_pr', 'LOB'].includes(title)
  //     ? player.content.stats[tableName === 'batting' ? 'running' : 'catching'][title]
  //     : ['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title)
  //     ? player.content.stats.fielding[title]
  //     : toFixList.includes(title)
  //     ? player.content.stats[tableName][title] === 'Infinity'
  //       ? 'INF'
  //       : Number(player.content.stats[tableName][title]).toFixed(3)
  //     : player.content.stats[tableName][title];

  const cellStyle = toFixList.includes(title) ? { width: '3rem' } : null;
  const value = getValue();

  const filteredValue = Number(value) < 0 ? '—' : value;

  return <td style={cellStyle}>{filteredValue}</td>;
};

export default ContentBoxTableBodyCell;
