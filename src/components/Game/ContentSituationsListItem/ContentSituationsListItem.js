import React, { forwardRef } from 'react';
import cl from './ContentSituationsListItem.module.scss';
import ContentCardSimple from '../ContentCardSimple/ContentCardSimple';
import ContentCardComplex from '../ContentCardComplex/ContentCardComplex';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';

const ContentSituationsListItem = ({ player, situationClick, currentCard, cardIndex, cardsCount }, ref) => {
  // useEffect(() => {
  // let observer = new IntersectionObserver(entries => {
  //   entries.forEach(entry => {
  //     const { isIntersecting } = entry;

  //     if (isIntersecting) {
  //       console.log('Intersecting', player.who);
  //     } else {
  //       console.log('Not intersecting', player.who);
  //     }
  //   });
  // });
  // observer.observe(activeRef.current);

  // }, []);

  const classNames = [cl.listItem];

  currentCard.moments &&
    player.moments[0].inner.id === currentCard.moments[0].inner.id &&
    classNames.push(cl.active);

  //Filling situationsArr with moments where icons.rect_text exists
  const situationsArr = [];
  player.moments.forEach(moment => moment.icons?.rect_text && situationsArr.push(moment));

  const activeRef =
    currentCard.moments && player.moments[0].inner.id === currentCard.moments[0].inner.id
      ? ref
      : null || null;
  return (
    <li
      ref={activeRef}
			// data-after={cardIndex === cardsCount - 1 ? }
      className={classNames.join(' ')}
      // style={cardIndex === 0 ? { marginTop: 50 } : cardIndex === cardsCount - 1 ? { marginBottom: 50 } : {}}
      onClick={situationClick(player)}>
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
