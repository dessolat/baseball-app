import React from 'react';
import cl from './PlaysSpin.module.scss';

const PlaysSpin = () => {
  return (
    <div className={cl.spin}>
      <div></div>
      <div>
				<p className={cl.subHeader}>True spin</p>
				<p className={cl.regularValue}>1952.1 rpm</p>
				<p className={cl.subHeader}>Vertical break</p>
				<p className={cl.breakValue}>52.0 cm</p>
				<p className={cl.subHeader}>Horizontal break</p>
				<p className={cl.breakValue}>24.7 cm</p>
			</div>
    </div>
  );
};

export default PlaysSpin;
