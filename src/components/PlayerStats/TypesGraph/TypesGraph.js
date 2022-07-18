import React, { Fragment } from 'react';
import cl from './TypesGraph.module.scss';

const TypesGraph = () => {
  const typesArr = [
    { type: 'Type', color: '#1A4C96' },
    { type: 'Type', color: '#FEAB01' },
    { type: 'Type', color: '#E2001C' }
  ];

  return (
    <svg viewBox='0 0 120 180' xmlns='http://www.w3.org/2000/svg' className={cl.graph}>
      {typesArr.map((type, i) => (
        <Fragment key={i}>
          <circle cx='10' cy={10 + 25 * i} r='3.75' fill={type.color} stroke='black' strokeWidth='0.5' />
          <text x='22' y={14 + 25 * i} className={cl.typeText}>
            Type
          </text>
        </Fragment>
      ))}
    </svg>
  );
};

export default TypesGraph;
