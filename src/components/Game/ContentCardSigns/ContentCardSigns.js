import React from 'react';
import cl from './ContentCardSigns.module.scss';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';
import Outs from 'components/UI/icons/Outs/Outs';

const ContentCardSigns = ({ table }) => {
  const { r1, r2, r3, outs, balls, strikes } = table;

  return (
    <>
      <div className={cl.ellipses}>
        <Outs outs={outs} />
        <BallsStrikes balls={balls} strikes={strikes} />
      </div>
      <Bases r1={r1} r2={r2} r3={r3} />
    </>
  );
};

export default ContentCardSigns;
