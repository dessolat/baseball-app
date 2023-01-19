import React, { useLayoutEffect, useRef } from 'react';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';
import ContentCardTitle from '../ContentCardTitle/ContentCardTitle';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const HeaderTop = ({ cl, eventsSummary, player, sit }) => {
  const ref = useRef(null);

  const imagesData = useSelector(state => state.game.imagesData);

  useLayoutEffect(() => {
    ref.current.innerHTML = eventsSummary.length > 0 ? eventsSummary.join('.') + '.' : '';
  }, [eventsSummary, sit.icons.rect_text]);

  const cardText = eventsSummary.length > 0 ? eventsSummary.join('.') + '.' : '';
  const imgSrc = imagesData[player.who_id] || PortraitImg;
  const imgClasses = classNames({ [cl.default]: !imagesData[player.who_id] });

  return (
    <div className={cl.top}>
      <ContentCardTitle player={player} />
      <div className={cl.portraitTextWrapper}>
        <ContentCardPortrait playerId={player.who_id} cl={cl} />
        <p className={cl.text} ref={ref}>
          {cardText}
        </p>
      </div>
    </div>
  );
};

export default HeaderTop;
