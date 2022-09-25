import React from 'react';
import cl from './ContentCardSimple.module.scss';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import Outs from 'components/UI/icons/Outs/Outs';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';
import classNames from 'classnames';
import ContentCardTitle from '../ContentCardTitle/ContentCardTitle';

const ContentCardSimple = ({ player }) => {
  const imagesData = useSelector(state => state.game.imagesData);
  const isVideo = useSelector(state => state.game.isVideo);

  const lastMoment = player.moments.slice(-1)[0];
  const { r1, r2, r3, outs, balls, strikes } = lastMoment?.table || 0;

  const eventsSummary = lastMoment?.events?.reduce((sum, event) => [...sum, event.description], []) || [];
  const cardText = eventsSummary.length > 0 ? eventsSummary.join('.') + '.' : '';
  const imgClassName = !imagesData[player.who_id] ? cl.default : '';
  const imgSrc = imagesData[player.who_id] || PortraitImg;

  const wrapperClasses = classNames(cl.rectanglesEllipsesWrapper, {
    [cl.noVideo]: !isVideo
  });
  return (
    <div className={cl.classic}>
      <ContentCardTitle player={player} />
      <div className={cl.portraitTextWrapper}>
        <ContentCardPortrait className={imgClassName} src={imgSrc} cl={cl} />
        <div className={cl.text}>
          {cardText}
          <div className={wrapperClasses}>
            <div className={cl.ellipses}>
              <Outs outs={outs} />
              <BallsStrikes balls={balls} strikes={strikes} />
            </div>
            <Bases r1={r1} r2={r2} r3={r3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCardSimple;
