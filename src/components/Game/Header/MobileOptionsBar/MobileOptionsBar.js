import classNames from 'classnames';
import cl from './MobileOptionsBar.module.scss';
import OptionsDropdown from './OptionsDropdown';
import ScoreInfo from './ScoreInfo';
import { useSelector } from 'react-redux';

const MobileOptionsBar = () => {
  const isVideo = useSelector(s => s.game.isVideo);

  const optionsBarClasses = classNames(cl.onlyPortraitMobile, cl.optionsBar, {
    [cl.noVideo]: !isVideo
  });
  return (
    <div className={optionsBarClasses}>
      <ScoreInfo />
      {isVideo && <OptionsDropdown />}
    </div>
  );
};

export default MobileOptionsBar;
