import React, { useLayoutEffect, useRef } from 'react';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';
import ContentCardTitle from '../ContentCardTitle/ContentCardTitle';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
// import PortraitImg from 'images/portrait.png';
// import { useSelector } from 'react-redux';
// import classNames from 'classnames';

const HeaderTop = ({ cl, eventsSummary, player, sit, noCardTitle, innerRects }) => {
  const ref = useRef(null);

  // const imagesData = useSelector(state => state.game.imagesData);

  useLayoutEffect(() => {
    ref.current.innerHTML = eventsSummary.length > 0 ? eventsSummary.join('.') + '.' : '';
  }, [eventsSummary, sit.icons.rect_text]);

  const cardText = eventsSummary.length > 0 ? eventsSummary.join('.') + '.' : '';
  // const imgSrc = imagesData[player.who_id] || PortraitImg;
  // const imgClasses = classNames({ [cl.default]: !imagesData[player.who_id] });
  const isRectScore = sit.icons.score_own !== undefined;
  return (
    <div className={cl.top}>
      {!noCardTitle && <ContentCardTitle player={player} />}
      <div className={cl.portraitTextWrapper}>
        <ContentCardPortrait playerId={player.who_id} cl={cl} />
        <div className={cl.topRight}>
          <p className={cl.text} ref={ref} style={innerRects ? {lineHeight: .85, paddingBottom: 1} : null}>
            {cardText}
          </p>
          {innerRects && (
            <div className={cl.rects}>
              <RectText icons={sit.icons} />
              {isRectScore && <RectScore icons={sit.icons} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
