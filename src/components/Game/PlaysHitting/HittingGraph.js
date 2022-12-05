import React from 'react';
import cl from './PlaysHitting.module.scss';
import GraphImage from 'images/hit_graph_thumb.png';

const Header = ({ maxSpeed }) => {
  const maxSpeedValue = maxSpeed ? `${maxSpeed} mph` : ' ';
  const angleValue = maxSpeed ? `12.4 degrees` : ' ';

  return (
    <div className={cl.row}>
      <div>
        <span className={cl.title}>Attack Angle</span>
        <span className={cl.value}>{angleValue}</span>
      </div>
      <div>
        <span className={cl.title}>Max speed</span>
        <span className={cl.value}>{maxSpeedValue}</span>
      </div>
    </div>
  );
};

const Graph = () => {
  return (
    <div className={cl.graphWrapper}>
      <p className={cl.title}>Bat speed (mph)</p>
      <img src={GraphImage} alt='graph-image' width='100%' />
    </div>
  );
};

const HittingGraph = ({ bat }) => {
  const { max_speed: maxSpeed } = bat || {};

  return (
    <div className={cl.graph}>
      <Header maxSpeed={maxSpeed} />
      <Graph />
    </div>
  );
};

export default HittingGraph;
