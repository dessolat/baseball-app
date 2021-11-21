import React, { forwardRef } from 'react';
import cl from './ContentSituationsListItem.module.scss';
import PortraitImg from 'images/portrait.png';
import Ellipses from 'components/UI/icons/Ellipses/Ellipses';
import RectanglesEllipses from 'components/UI/icons/RectanglesEllipses/RectanglesEllipses';
import ContentCardSimple from '../ContentCardSimple/ContentCardSimple';
import ContentCardComplex from '../ContentCardComplex/ContentCardComplex';

const ContentSituationsListItem = ({ player, situationClick, currentCard }, ref) => {
  const classNames = [cl.listItem];
  player.who_id === currentCard.who_id &&
    player.inning_number === currentCard.inning_number &&
    classNames.push(cl.active);

  //Filling situationsArr with moments where icons.rect_text exists
  const situationsArr = [];
  player.moments.forEach(
    (moment, i) =>
      moment.icons?.rect_text &&
      (moment.icons.rect_text !== 'Replacement'
        ? situationsArr.push(moment)
        : i !== 0 && situationsArr.push(moment))
  );

  return (
    <li
      ref={
        player.who_id === currentCard.who_id && player.inning_number === currentCard.inning_number
          ? ref
          : null
      }
      className={classNames.join(' ')}
      onClick={() => situationClick(player)}>
      {situationsArr.length > 0 ? (
        <ContentCardComplex player={player} situationsArr={situationsArr} />
      ) : (
        <ContentCardSimple player={player} />
      )}
    </li>
  );
};

export default forwardRef(ContentSituationsListItem);
