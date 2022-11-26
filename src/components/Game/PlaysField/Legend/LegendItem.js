import React from 'react';
import ListDot from 'components/UI/icons/ListDot/ListDot';
import cl from './Legend.module.scss';

const LegendItem = ({ dotFill = '#1A4C96', title }) => {
  return (
    <li className={cl.legendItem}>
      <ListDot fill={dotFill} />
      {title}
    </li>
  );
};

export default LegendItem;
