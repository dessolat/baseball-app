import classNames from 'classnames';
import cl from './MobileOptionsBar.module.scss';
import OptionsDropdown from './OptionsDropdown/OptionsDropdown';
import ScoreInfo from './ScoreInfo';
import { useSelector } from 'react-redux';
import InfoDropdown from './InfoDropdown/InfoDropdown';

const MobileOptionsBar = ({ currentTab = null, portrait = true, landscape = false }) => {
  const isVideo = useSelector(s => s.game.isVideo);

  const optionsBarClasses = classNames(cl.optionsBar, {
    [cl.onlyPortraitMobile]: portrait,
    [cl.onlyLandscapeMobile]: landscape,
    [cl.noVideo]: !isVideo
  });

  const isOptions = isVideo && currentTab !== 'box';
  const isInfo = isVideo && currentTab === 'box';
  return (
    <div className={optionsBarClasses} style={currentTab === 'box' ? {paddingRight: 10, borderBottom: 'unset'} : null}>
      <ScoreInfo />
      {isOptions && <OptionsDropdown />}
      {isInfo && <InfoDropdown />}
    </div>
  );
};

export default MobileOptionsBar;
