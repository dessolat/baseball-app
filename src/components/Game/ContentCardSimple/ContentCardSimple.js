import React from 'react';
import cl from './ContentCardSimple.module.scss';
import Ellipses from 'components/UI/icons/Ellipses/Ellipses';
import RectanglesEllipses from 'components/UI/icons/RectanglesEllipses/RectanglesEllipses';
import PortraitImg from 'images/portrait.png';

const ContentCardSimple = ({player}) => {
	const eventsSummary = [];
  const lastMoment = player.moments.slice(-1)[0];
  const { r1, r2, r3, outs, balls, strikes } = lastMoment?.table || 0;

  lastMoment?.events?.forEach(event => eventsSummary.push(event.description));


  return (
    <div className={cl.classic}>
      <div className={cl.textRectanglesWrapper}>
        <p className={cl.playerName}>{`${player.hit_order}. ${player.who}`}</p>
        <p className={cl.text}>{eventsSummary.join('.') + '.'}</p>
        <RectanglesEllipses r1={r1} r2={r2} r3={r3} outs={outs} />
				
      </div>
      <div className={cl.portraitEllipsesWrapper}>
        <img className={cl.portrait} src={PortraitImg} alt='Portrait' />
        <Ellipses balls={balls} strikes={strikes} />
      </div>
    </div>
  );
};

export default ContentCardSimple;
