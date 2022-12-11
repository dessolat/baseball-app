import React from 'react';
import cl from './PlaysHitting.module.scss';
import GraphImage from 'images/hit_graph_thumb.png';

const Header = ({ maxSpeed, angle }) => {
  const maxSpeedValue = maxSpeed !== undefined ? `${maxSpeed} mph` : '—';
  const angleValue = angle !== undefined ? `${angle} degrees` : '—';

  return (
    <div className={cl.headerWrapper}>
      <div className={cl.leftSide}>
        <div className={cl.row}>
          <span className={cl.title}>Attack Angle</span>
          <span className={cl.value}>{angleValue}</span>
        </div>
      </div>
      <div className={cl.rightSide}>
        <div className={cl.row}>
          <span className={cl.title}>Max speed</span>
          <span className={cl.value}>{maxSpeedValue}</span>
        </div>
      </div>
    </div>
  );
};

const Graph = () => {
  return (
    <div className={cl.graphWrapper}>
      <p className={cl.title}>Bat speed (mph)</p>
      <img src={GraphImage} alt='graph' width='100%' />
    </div>
  );
};

const HittingGraph = ({ bat }) => {
  const { max_speed: maxSpeed, angle } = bat || {};

  return (
    <div className={cl.graph}>
      <Header maxSpeed={maxSpeed} angle={angle} />
      <Graph />
    </div>
  );
};

export default HittingGraph;
