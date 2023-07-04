import cl from '../Videos.module.scss';
import { useSelector } from 'react-redux';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';
import Outs from 'components/UI/icons/Outs/Outs';

const Signs = () => {
	const currentCard = useSelector(state => state.game.currentCard);

  const situationsArr = [];
  currentCard.moments?.forEach(moment => moment.icons?.rect_text && situationsArr.push(moment));

  const { r1, r2, r3, outs, balls, strikes } = situationsArr[situationsArr.length - 1]?.table || {};
  return (
    <div className={cl.signs}>
      <BallsStrikes balls={balls} strikes={strikes} />
      <Bases r1={r1} r2={r2} r3={r3} />
      <Outs outs={outs} />
    </div>
  );
};

export default Signs;
