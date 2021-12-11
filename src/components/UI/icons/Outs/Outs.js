import React from 'react';
import Ellipse from '../Ellipse';
import cl from './Outs.module.scss';

const Outs = ({ outs }) => {
  return (
    <div className={cl.ellipses}>
      <Ellipse className={cl.leftEllipse + ' ' + cl.absolute} fill={outs > 0 && '#1A4C96'} />
      <Ellipse className={cl.rightEllipse + ' ' + cl.absolute} fill={outs > 1 && '#1A4C96'} />
    </div>
  );
};

export default Outs;
