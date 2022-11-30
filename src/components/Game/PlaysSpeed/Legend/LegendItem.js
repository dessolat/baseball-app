import React from 'react';
import ListDot from 'components/UI/icons/ListDot/ListDot';
import cl from './Legend.module.scss';

const COLORS = {
	'-1': 'lightgray',
	0: '#1A4C96',
	1: 'red',
	2: 'green',
	3: 'olive',
	4: 'yellow',
	5: 'purple',
	6: 'lightgreen'
};

const LegendItem = ({ title }) => {
  return (
    <li className={cl.legendItem}>
      <ListDot fill={COLORS[title]} />
      Type {title}
    </li>
  );
};

export default LegendItem;
