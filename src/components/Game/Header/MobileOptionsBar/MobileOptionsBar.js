import classNames from 'classnames';
import cl from './MobileOptionsBar.module.scss';
import OptionsDropdown from './OptionsDropdown/OptionsDropdown';
import ScoreInfo from './ScoreInfo';
import { useSelector } from 'react-redux';

const MobileOptionsBar = ({portrait = true, landscape = false}) => {
  const isVideo = useSelector(s => s.game.isVideo);

  const optionsBarClasses = classNames(cl.optionsBar, {
		[cl.onlyPortraitMobile]: portrait,
		[cl.onlyLandscapeMobile]: landscape,
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
