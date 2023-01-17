import React from 'react';
import ListDot from 'components/UI/icons/ListDot/ListDot';
import cl from './Legend.module.scss';
import { getChartColor } from 'utils';
import usePitchTypes from 'hooks/usePitchTypes';

const LegendItem = ({ title }) => (
  <li className={cl.legendItem}>
    <ListDot fill={getChartColor(title)} />
    {usePitchTypes(title)}
  </li>
);

export default LegendItem;
