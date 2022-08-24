import React from 'react';
import Ellipse from '../Ellipse';
import cl from './BallsStrikes.module.scss';

const BallsStrikes = ({ balls, strikes }) => (
  <div className={cl.ellipses}>
    <Ellipse fill={balls > 0 && '#2B9D6A'} />
    <Ellipse fill={balls > 1 && '#2B9D6A'} />
    <Ellipse fill={balls > 2 && '#2B9D6A'} />
    <Ellipse fill={balls > 3 && '#2B9D6A'} />
    <Ellipse fill={strikes > 0 && '#E2001C'} />
    <Ellipse fill={strikes > 1 && '#E2001C'} />
    <Ellipse fill={strikes > 2 && '#E2001C'} />
  </div>
);

export default BallsStrikes;
