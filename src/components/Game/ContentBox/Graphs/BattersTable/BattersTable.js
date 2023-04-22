import { useState } from 'react';
import cl from './BattersTable.module.scss';
import classNames from 'classnames';

const TableCell = ({ colNumber, row, cell: { clName, value, ending }, activeColumn }) => {
  const cellClasses = classNames(cl[clName], {
		[cl.active]: colNumber === activeColumn
	});

  return (
    <div className={cellClasses}>
      {row[value]}
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

const BattersTable = () => {
  const [activeColumn, setActiveColumn] = useState(4);

  const rowCells = [
    { clName: 'name', value: 'name', ending: '' },
    { clName: 'value', value: 'hitNumber', ending: '' },
    { clName: 'value', value: 'angle', ending: '°' },
    { clName: 'value', value: 'velocity', ending: ' mph' },
    { clName: 'value', value: 'distance', ending: ' m' }
  ];

  const battersArr = [
    { name: 'SURNAME Name1', hitNumber: 1, angle: 30, velocity: 80, distance: 90 },
    { name: 'SURNAME Name1', hitNumber: 2, angle: 20, velocity: 60, distance: 70 },
    { name: 'SURNAME Name1', hitNumber: 3, angle: 30, velocity: 40, distance: 90 },
    { name: 'SURNAME Name2', hitNumber: 1, angle: 50, velocity: 50, distance: 50 },
    { name: 'SURNAME Name2', hitNumber: 2, angle: 60, velocity: 80, distance: 40 },
    { name: 'SURNAME Name2', hitNumber: 3, angle: 30, velocity: 70, distance: 70 },
    { name: 'SURNAME Name3', hitNumber: 1, angle: 40, velocity: 30, distance: 90 },
    { name: 'SURNAME Name3', hitNumber: 2, angle: 30, velocity: 60, distance: 30 },
    { name: 'SURNAME Name3', hitNumber: 3, angle: 20, velocity: 30, distance: 10 },
    { name: 'SURNAME Name4', hitNumber: 1, angle: 10, velocity: 70, distance: 50 }
  ];

  return (
    <div className={cl.wrapper}>
      {battersArr.map((row, i) => (
        <TableRow key={i} row={row} rowCells={rowCells} activeColumn={activeColumn} />
      ))}
    </div>
  );
};

export default BattersTable;
