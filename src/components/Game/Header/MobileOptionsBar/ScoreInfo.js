import cl from './MobileOptionsBar.module.scss';
import { shallowEqual, useSelector } from 'react-redux';

const ScoreInfo = () => {
  const preview = useSelector(s => s.game.preview, shallowEqual);

  return (
    <div className={cl.scoreInfo}>
      <div className={cl.team}>
        <span className={cl.teamName}>{preview.guests.name}</span>
        <span className={cl.teamScore}>{preview.guests.score}</span>
      </div>
      <div className={cl.team}>
        <span className={cl.teamName}>{preview.owners.name}</span>
        <span className={cl.teamScore}>{preview.owners.score}</span>
      </div>
    </div>
  );
};

export default ScoreInfo;
