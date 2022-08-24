import React from 'react';
import Ellipse from '../Ellipse';
import cl from './Outs.module.scss';

const Outs = ({ outs }) => (
  <div className={cl.ellipses}>
    <Ellipse fill={outs > 0 && '#1A4C96'} />
    <Ellipse fill={outs > 1 && '#1A4C96'} />
  </div>
);

export default Outs;
