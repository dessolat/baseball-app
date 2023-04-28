const ContentBoxTableFooterCell = ({ title, toFixList, tableName, tableData }) => {
  const { total_stats: totalStats } = tableData;
  const { batting, running, fielding } = totalStats;

  const getValue = () => {
    if (title === 'POS') return ' ';

    if (tableName === 'batting') {
      if (['SB_pr', 'LOB', 'CS', 'SB'].includes(title)) return running[title];

      if (['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title)) return fielding[title];

      if (toFixList.includes(title)) return Number(batting[title]).toFixed(3);

      return batting[title];
    }

    if (toFixList.includes(title)) return Number(totalStats[tableName][title]).toFixed(3);

    return totalStats[tableName][title];
  };
  return <td>{getValue()}</td>;
};

export default ContentBoxTableFooterCell;
