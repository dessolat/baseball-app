import React from 'react';
import cl from './ContentCardSimple.module.scss';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';
import classNames from 'classnames';
import ContentCardTitle from '../ContentCardTitle/ContentCardTitle';
import ContentCardSigns from '../ContentCardSigns/ContentCardSigns';

const ContentCardSimple = ({ player }) => {
  const imagesData = useSelector(state => state.game.imagesData);
  const isVideo = useSelector(state => state.game.isVideo);

  const lastMoment = player.moments.slice(-1)[0];

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
            <ContentCardSigns table={lastMoment?.table || 0}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCardSimple;
