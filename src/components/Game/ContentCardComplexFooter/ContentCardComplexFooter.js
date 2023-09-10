import React from 'react';
import cl from './ContentCardComplexFooter.module.scss';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';
import Outs from 'components/UI/icons/Outs/Outs';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const ContentCardComplexFooter = ({ lastMoment, noSigns }) => {
  const isVideo = useSelector(state => state.game.isVideo);

  const eventsSummary = [];
  const { r1, r2, r3, outs, balls, strikes } = lastMoment?.table || 0;

  lastMoment?.events?.forEach(event => eventsSummary.push(event.description));

  const cardText = eventsSummary.join('.') + '.';

  const wrapperClasses = classNames(cl.rectanglesEllipsesWrapper, {
    [cl.noVideo]: !isVideo
  });
  return (
    <div className={cl.footer}>
      <p className={cl.text}>{cardText}</p>
      {!noSigns && (
        <div className={wrapperClasses}>
          <div className={cl.ellipses}>
            <Outs outs={outs} />
            <BallsStrikes balls={balls} strikes={strikes} />
          </div>
          <Bases r1={r1} r2={r2} r3={r3} />
        </div>
      )}
    </div>
  );
};

export default ContentCardComplexFooter;
