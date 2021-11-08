import React from 'react';
import cl from './ContentSituationsListItem.module.scss';
import PortraitImg from 'images/portrait.png';
import Ellipse from 'components/UI/icons/Ellipse';
import Rectangle from 'components/UI/icons/Rectangle';

const ContentSituationsListItem = ({ player, number, situationClick, currentCard }) => {
  const eventsSummary = [];
  const lastMoment = player.moments.slice(-1)[0];
  lastMoment.events?.forEach(event => eventsSummary.push(event.description));
  const { r1, r2, r3, outs, balls, strikes } = lastMoment.table;
  const classNames = [cl.listItem];
  player.who_id === currentCard.who_id &&
    player.inning_number === currentCard.inning_number &&
    classNames.push(cl.active);

  return (
    <li className={classNames.join(' ')} onClick={() => situationClick(player, number)}>
      <div className={cl.portraitRectanglesWrapper}>
        <img className={cl.portrait} src={PortraitImg} alt='Portrait' />
        <div className={cl.rectangles}>
          <Rectangle className={cl.topRectangle + ' ' + cl.absolute} fill={r2 && '#FFAB00'} />
          <Rectangle className={cl.leftRectangle + ' ' + cl.absolute} fill={r3 && '#FFAB00'} />
          <Rectangle className={cl.rightRectangle + ' ' + cl.absolute} fill={r1 && '#FFAB00'} />
          <Ellipse className={cl.leftEllipse + ' ' + cl.absolute} fill={outs > 0 && '#1A4C96'} />
          <Ellipse className={cl.rightEllipse + ' ' + cl.absolute} fill={outs > 1 && '#1A4C96'} />
        </div>
      </div>
      <div className={cl.textEllipsesWrapper}>
        <p className={cl.text}>{eventsSummary.join('.')}</p>
        <div className={cl.ellipsesWrapper}>
          <div className={cl.ellipses}>
            <Ellipse fill={balls > 0 && '#2B9D6A'} />
            <Ellipse fill={balls > 1 && '#2B9D6A'} />
            <Ellipse fill={balls > 2 && '#2B9D6A'} />
            <Ellipse fill={strikes > 0 && '#E2001C'} />
            <Ellipse fill={strikes > 1 && '#E2001C'} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default ContentSituationsListItem;
