import React from 'react';
import cl from './ContentCardComplexFooter.module.scss';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import RectanglesEllipses from 'components/UI/icons/RectanglesEllipses/RectanglesEllipses';

const ContentCardComplexFooter = ({ lastMoment }) => {
	const eventsSummary = [];
  const { r1, r2, r3, outs, balls, strikes } = lastMoment?.table || 0;

  lastMoment?.events?.forEach(event => eventsSummary.push(event.description));

  return (
    <div className={cl.footer}>
      <p className={cl.text}>{eventsSummary.join('.') + '.'}</p>
      <div className={cl.rectanglesEllipsesWrapper}>
        <RectanglesEllipses r1={r1} r2={r2} r3={r3} outs={outs} />
        <BallsStrikes balls={balls} strikes={strikes} />
      </div>
    </div>
  );
};

export default ContentCardComplexFooter;
