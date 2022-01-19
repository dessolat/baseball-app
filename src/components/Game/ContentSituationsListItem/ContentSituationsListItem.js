import React, { forwardRef } from 'react';
import cl from './ContentSituationsListItem.module.scss';
import ContentCardSimple from '../ContentCardSimple/ContentCardSimple';
import ContentCardComplex from '../ContentCardComplex/ContentCardComplex';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import { useSelector } from 'react-redux';

const ENDINGS = ['ST', 'ND', 'RD', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH'];

const ContentSituationsListItem = (
  { player, situationClick, currentCard, cardIndex, beforeAfterData },
  ref
) => {
  const situationFilter = useSelector(state => state.game.situationFilter);
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

  const dataBefore = beforeAfterData[cardIndex]?.before
    ? `${player.side.toUpperCase()} ${player.inning_number}${ENDINGS[player.inning_number - 1]}`
    : null;
  const isDataAfter = beforeAfterData[cardIndex]?.after && situationFilter === 'All';

	const styles = {}
	if (dataBefore && situationFilter !== 'All') styles.marginTop = cardIndex === 0 ? 24 : 26
	if (!isDataAfter && situationFilter !== 'All') styles.marginBottom = 0

  return (
    <li
      ref={activeRef}
      data-before={dataBefore}
      data-after={isDataAfter}
      className={classNames.join(' ')}
      style={styles}
      onClick={situationClick(player)}>
      {player.type === 'Replacement' ? (
        <ContentCardReplacement text={player.moments[0].events[0].description} />
      ) : situationsArr.length > 0 ? (
        <ContentCardComplex player={player} situationsArr={situationsArr} />
      ) : (
        <ContentCardSimple player={player} />
      )}
      {isDataAfter && (
        <div className={cl.dataAfter}>
          <span>RUNS: {beforeAfterData[cardIndex].after.runs}</span>
          <span>HITS: {beforeAfterData[cardIndex].after.hits}</span>
          <span>ERRORS: {beforeAfterData[cardIndex].after.err}</span>
          <span>LOB: {beforeAfterData[cardIndex].after.lob}</span>
        </div>
      )}
    </li>
  );
};

export default forwardRef(ContentSituationsListItem);
