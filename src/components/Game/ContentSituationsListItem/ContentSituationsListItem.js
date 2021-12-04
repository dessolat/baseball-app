import React, { forwardRef } from 'react';
import cl from './ContentSituationsListItem.module.scss';
import ContentCardSimple from '../ContentCardSimple/ContentCardSimple';
import ContentCardComplex from '../ContentCardComplex/ContentCardComplex';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';

const ContentSituationsListItem = ({ player, situationClick, currentCard }, ref) => {
  const classNames = [cl.listItem];

  player.type === currentCard.type &&
    player.who_id === currentCard.who_id &&
    player.inning_number === currentCard.inning_number &&
    classNames.push(cl.active);

  //Filling situationsArr with moments where icons.rect_text exists
  const situationsArr = [];
  player.moments.forEach(moment => moment.icons?.rect_text && situationsArr.push(moment));

  return (
    <li
      ref={
        player.who_id === currentCard.who_id && player.inning_number === currentCard.inning_number
          ? ref
          : null
      }
      className={classNames.join(' ')}
      onClick={() => situationClick(player)}>
      {player.type === 'Replacement' ? (
        <ContentCardReplacement text={player.moments[0].events[0].description} />
      ) : situationsArr.length > 0 ? (
        <ContentCardComplex player={player} situationsArr={situationsArr} />
      ) : (
        <ContentCardSimple player={player} />
      )}
    </li>
  );
};

export default forwardRef(ContentSituationsListItem);
