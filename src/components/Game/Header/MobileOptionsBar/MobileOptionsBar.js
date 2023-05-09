import classNames from 'classnames';
import cl from './MobileOptionsBar.module.scss';
import { shallowEqual, useSelector } from 'react-redux';
import OptionsBtn from './OptionsBtn';

const MobileOptionsBar = () => {
  const preview = useSelector(s => s.game.preview, shallowEqual);

  const optionsBarClasses = classNames(cl.onlyPortraitMobile, cl.optionsBar);

  return (
    <div className={optionsBarClasses}>
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
      <OptionsBtn />
    </div>
  );
};

export default MobileOptionsBar;
