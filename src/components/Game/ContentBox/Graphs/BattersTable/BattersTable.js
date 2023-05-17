import { memo, useState } from 'react';
import cl from './BattersTable.module.scss';
import classNames from 'classnames';
import SortArrows from 'components/UI/icons/SortArrows/SortArrows';

const TableHeader = ({ activeColumn, handleHeaderClick }) => {
  const titlesArr = [
    { text: 'Batter name', clName: 'name', sortField: 'name' },
    { text: 'Hit number', clName: 'value', sortField: 'hitNumber' },
    { text: 'Hit angle', clName: 'value', sortField: 'angle' },
    { text: 'Exit velocity', clName: 'value', sortField: 'velocity' },
    { text: 'Distance', clName: 'value', sortField: 'distance' }
  ];

  return (
    <div className={cl.header}>
      {titlesArr.map(({ text, clName, sortField }, i) => {
        const isActiveCell = sortField === activeColumn.sortField;

        const cellClasses = classNames(cl[clName], cl.headerCell, {
          [cl.active]: isActiveCell
        });
        return (
          <div key={`title-${i}-${text}`} className={cellClasses} onClick={handleHeaderClick(sortField)}>
            {text}
            {isActiveCell && (
              <SortArrows
                direction={activeColumn.dir}
                style={{ position: 'absolute', left: '50%', top: '.3rem', translate: '-50%' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const TableCell = ({ row, cell: { clName, value, ending }, activeColumn }) => {
  const cellClasses = classNames(cl[clName], {
    [cl.active]: value === activeColumn.sortField
  });

  const formattedValue = clName === 'value' ? Math.round(row[value]) : row[value];
  return (
    <div className={cellClasses}>
      {formattedValue}
      {ending}
    </div>
  );
};

const TableRow = ({ row, rowCells, activeColumn, handleRowClick }) => {
  return (
    <div className={cl.row} onClick={handleRowClick(row.game_id, row.mom_id)}>
      {rowCells.map((cell, i) => (
        <TableCell
          key={`cell-${i}-${cell.value}`}
          colNumber={i + 1}
          row={row}
          cell={cell}
          activeColumn={activeColumn}
        />
      ))}
    </div>
  );
};

const BattersTable = ({ metrix }) => {
  const [activeColumn, setActiveColumn] = useState({ sortField: 'velocity', dir: 'desc' });

  const rowCells = [
    { clName: 'name', value: 'name', ending: '' },
    { clName: 'value', value: 'hitNumber', ending: '' },
    { clName: 'value', value: 'angle', ending: '°' },
    { clName: 'value', value: 'velocity', ending: ' mph' },
    { clName: 'value', value: 'distance', ending: ' m' }
  ];

  const battersArr = metrix.reduce((sum, { pitches_all, preview }) => {
    console.log(pitches_all);
    pitches_all
      .filter(({ hit_info }) => hit_info.angle)
      .forEach(
        ({ hit_info: { angle, 'exit velocity': velocity, distance }, pitch_info: { game_id, mom_id } }, i) =>
          sum.push({
            name: `${preview.batter_name} ${preview.batter_surname}`,
            hitNumber: i + 1,
            angle,
            velocity,
            distance,
            game_id,
            mom_id
          })
      );

    return sum;
  }, []);

  const handleHeaderClick = sortField => () =>
    setActiveColumn(prev => {
      if (prev.sortField === sortField) return { ...prev, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      return { ...prev, sortField };
    });

  battersArr.sort((a, b) => {
    if (activeColumn.dir === 'asc') return a[activeColumn.sortField] > b[activeColumn.sortField] ? 1 : -1;
    return a[activeColumn.sortField] > b[activeColumn.sortField] ? -1 : 1;
  });

  const handleRowClick = (gameId, momentId) => () => {
    window.open(`/game/${gameId}?card=${momentId}&tab=hitting`, '_blank');
  };

  console.log(battersArr);
  return (
    <div className={cl.wrapper}>
      <TableHeader activeColumn={activeColumn} handleHeaderClick={handleHeaderClick} />
      {battersArr.map((row, i) => (
        <TableRow
          key={i}
          row={row}
          rowCells={rowCells}
          activeColumn={activeColumn}
          handleRowClick={handleRowClick}
        />
      ))}
    </div>
  );
};

export default memo(BattersTable);
