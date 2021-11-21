import React from 'react';
import cl from './ContentCardComplexHeader.module.scss';
import PortraitImg from 'images/portrait.png';
import Ellipses from 'components/UI/icons/Ellipses/Ellipses';
import RectanglesEllipses from 'components/UI/icons/RectanglesEllipses/RectanglesEllipses';

const ContentCardComplexHeader = ({ player, sit }) => {
  const { r1, r2, r3, outs, balls, strikes } = sit.table;
  const eventsSummary = [];
  sit.events.forEach(event => eventsSummary.push(event.description));

  return (
    <div>
      <div className={cl.top}>
        <div className={cl.textWrapper}>
          <p className={cl.playerName}>{`${player.hit_order}. ${player.who}`}</p>
          <p className={cl.text}>{eventsSummary.join('.')}</p>
        </div>
				<img className={cl.portrait} src={PortraitImg} alt='Portrait' />
      </div>

      <div className={cl.bottom}>
        <RectanglesEllipses r1={r1} r2={r2} r3={r3} outs={outs} />
        <div className={cl.rectText + ' ' + cl[sit.icons.rect_color]}>
          {sit.icons.rect_text.toUpperCase()}
        </div>
        {sit.icons.score_own !== undefined && (
          <div className={cl.rectText + ' ' + cl[sit.icons.rect_color]}>
            {sit.icons.score_gue + ' - ' + sit.icons.score_own}
          </div>
        )}
        <Ellipses balls={balls} strikes={strikes} />
      </div>
    </div>
  );
};

export default ContentCardComplexHeader;
