import React from 'react';
import ListDot from 'components/UI/icons/ListDot/ListDot';
import cl from './Legend.module.scss';
import { getChartColor, getPitchColorByName } from 'utils';
import usePitchTypes from 'hooks/usePitchTypes';

const LegendItem = ({ title, pitchTypes }) => (
  <li className={cl.legendItem}>
    <ListDot
      fill={getPitchColorByName(pitchTypes[title][0])}
      // fill={getChartColor(title)}
    />
    {usePitchTypes(title)}
  </li>
);

export default LegendItem;
