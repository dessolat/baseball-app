import cl from '../Videos.module.scss';
import ContentCardReplacement from '../../ContentCardReplacement/ContentCardReplacement';
import ContentCardComplex from '../../ContentCardComplex/ContentCardComplex';
import ContentCardSimple from '../../ContentCardSimple/ContentCardSimple';

const CurrentCard = ({ currentCard }) => {
  const situationsArr = [];
  currentCard.moments?.forEach(moment => moment.icons?.rect_text && situationsArr.push(moment));
	
  return (
    <div className={cl.currentCard}>
      {currentCard.type === 'Replacement' ? (
        <ContentCardReplacement events={currentCard.moments[0].events} />
      ) : situationsArr.length > 0 ? (
        <ContentCardComplex
          player={currentCard}
          situationsArr={situationsArr}
          noCardTitle
          noSigns
          innerRects
        />
      ) : (
        <ContentCardSimple player={currentCard} noCardTitle noSigns />
      )}
    </div>
  );
};

export default CurrentCard;
