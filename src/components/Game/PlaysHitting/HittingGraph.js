import React from 'react';
import cl from './PlaysHitting.module.scss';
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

const HittingGraph = () => {
  return <div className={cl.graph}>HittingGraph</div>;
};

export default HittingGraph;
