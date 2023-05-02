import React from 'react';
import ListDot from 'components/UI/icons/ListDot/ListDot';
import cl from './Legend.module.scss';
import { getPitchColorByName } from 'utils';

const LegendItem = ({ title }) => (
  <li className={cl.legendItem}>
    <ListDot fill={getPitchColorByName(title)} />
    {title}
  </li>
);

export default LegendItem;
