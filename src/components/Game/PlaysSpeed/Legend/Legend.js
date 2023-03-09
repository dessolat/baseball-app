import React from 'react';
import cl from './Legend.module.scss';
import LegendItem from './LegendItem';
import { useSelector } from 'react-redux';

const Legend = ({ legendData = [] }) => {
  const { pitch_types: pitchTypes } = useSelector(state => state.game.preview);

  return (
    <ul className={cl.legendWrapper}>
      {legendData.map((item, i) => (
        <LegendItem key={i} title={item} pitchTypes={pitchTypes} />
      ))}
    </ul>
  );
};

export default Legend;
