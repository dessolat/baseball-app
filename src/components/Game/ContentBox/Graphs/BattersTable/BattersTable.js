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

  const formattedValue = Math.round(row[value]);
  return (
    <div className={cellClasses}>
      {formattedValue}
      {ending}
    </div>
  );
};

const TableRow = ({ row, rowCells, activeColumn }) => {
  return (
    <div className={cl.row}>
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
    pitches_all
      .filter(({ hit_info }) => hit_info.angle)
      .forEach(({ hit_info: { angle, 'exit velocity': velocity, distance } }, i) =>
        sum.push({ name: preview.batter_id, hitNumber: i + 1, angle, velocity, distance })
      );

    return sum;
  }, []);

  // console.log(filteredMetrix);

  // const battersArr = [
  //   { name: 'SURNAME Name1', hitNumber: 1, angle: 30, velocity: 80, distance: 90 },
  //   { name: 'SURNAME Name1', hitNumber: 2, angle: 20, velocity: 60, distance: 70 },
  //   { name: 'SURNAME Name1', hitNumber: 3, angle: 30, velocity: 40, distance: 90 },
  //   { name: 'SURNAME Name2', hitNumber: 1, angle: 50, velocity: 50, distance: 50 },
  //   { name: 'SURNAME Name2', hitNumber: 2, angle: 60, velocity: 80, distance: 40 },
  //   { name: 'SURNAME Name2', hitNumber: 3, angle: 30, velocity: 70, distance: 70 },
  //   { name: 'SURNAME Name3', hitNumber: 1, angle: 40, velocity: 30, distance: 90 },
  //   { name: 'SURNAME Name3', hitNumber: 2, angle: 30, velocity: 60, distance: 30 },
  //   { name: 'SURNAME Name3', hitNumber: 3, angle: 20, velocity: 30, distance: 10 },
  //   { name: 'SURNAME Name4', hitNumber: 1, angle: 10, velocity: 70, distance: 50 }
  // ];

  const handleHeaderClick = sortField => () =>
    setActiveColumn(prev => {
      if (prev.sortField === sortField) return { ...prev, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      return { ...prev, sortField };
    });

  battersArr.sort((a, b) => {
    if (activeColumn.dir === 'asc') return a[activeColumn.sortField] > b[activeColumn.sortField] ? 1 : -1;
    return a[activeColumn.sortField] > b[activeColumn.sortField] ? -1 : 1;
  });
  return (
    <div className={cl.wrapper}>
      <TableHeader activeColumn={activeColumn} handleHeaderClick={handleHeaderClick} />
      {battersArr.map((row, i) => (
        <TableRow key={i} row={row} rowCells={rowCells} activeColumn={activeColumn} />
      ))}
    </div>
  );
};

export default memo(BattersTable);
