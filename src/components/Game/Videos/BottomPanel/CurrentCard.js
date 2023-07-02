import cl from '../Videos.module.scss';
import ContentCardReplacement from '../../ContentCardReplacement/ContentCardReplacement';
import ContentCardComplex from '../../ContentCardComplex/ContentCardComplex';
import ContentCardSimple from '../../ContentCardSimple/ContentCardSimple';

const CurrentCard = ({ currentCard }) => {
  const situationsArr = [];
  currentCard.moments?.forEach(moment => moment.icons?.rect_text && situationsArr.push(moment));

  const scrollVertically = e => {
		console.log(e);
    const start = e.target.scrollTop,
      change = 580,
      increment = 10;
    let currentTime = 0;

    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = function (name) {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, name === 'scroll-left' ? -change : change, 300);
      e.target.scrollTop = val;
      if (currentTime < 300) {
        setTimeout(() => animateScroll(name), increment);
      }
    };

    animateScroll(e.target.name);
  };
  const handleCardWheel = e => {
		// console.log(e.currentTarget);
		if (e.deltaY < 0) {
			// console.log(e);
		}
// console.log(e);
// 		e.currentTarget.scrollTo(0,100);
	}
  return (
    <div className={cl.currentCard} onScrollCapture={scrollVertically} >
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
