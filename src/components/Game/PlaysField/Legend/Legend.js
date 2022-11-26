import React from 'react';
import cl from './Legend.module.scss';
import LegendItem from './LegendItem';

const Legend = ({ legendData = [] }) => (
  <ul className={cl.legendWrapper}>
    {legendData.map((item, i) => (
      <LegendItem key={i} dotFill={item.fill} title={item.title} />
    ))}
  </ul>
);

export default Legend;
