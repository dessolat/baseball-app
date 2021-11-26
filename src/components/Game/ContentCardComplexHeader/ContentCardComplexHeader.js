import React from 'react';
import cl from './ContentCardComplexHeader.module.scss';
import PortraitImg from 'images/portrait.png';
import Ellipses from 'components/UI/icons/Ellipses/Ellipses';
import RectanglesEllipses from 'components/UI/icons/RectanglesEllipses/RectanglesEllipses';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';

const ContentCardComplexHeader = ({ player, sit }) => {
  const { r1, r2, r3, outs, balls, strikes } = sit.table;
  const eventsSummary = [];
  sit.events.forEach(event => eventsSummary.push(event.description));

  return (
    <div>
      <div className={cl.top}>
        <div className={cl.textWrapper}>
          <p className={cl.playerName}>{`${player.hit_order}. ${player.who}`}</p>
          <p className={cl.text}>{sit.icons.rect_text !== 'Replacement' ? eventsSummary.join('.') : ''}</p>
        </div>
        <img className={cl.portrait} src={PortraitImg} alt='Portrait' />
      </div>
      <div className={cl.bottom}>
        <RectanglesEllipses r1={r1} r2={r2} r3={r3} outs={outs} />
        {sit.icons.rect_text !== 'Replacement' && <RectText icons={sit.icons} />}
        {sit.icons.score_own !== undefined && <RectScore icons={sit.icons} />}
        <Ellipses balls={balls} strikes={strikes} />
      </div>

      {sit.icons.rect_text === 'Replacement' && <ContentCardReplacement text={eventsSummary.join('.')} />}
    </div>
  );
};

export default ContentCardComplexHeader;
