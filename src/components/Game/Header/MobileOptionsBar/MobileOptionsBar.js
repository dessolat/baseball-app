import classNames from 'classnames';
import cl from './MobileOptionsBar.module.scss';
import OptionsDropdown from './OptionsDropdown';
import ScoreInfo from './ScoreInfo';

const MobileOptionsBar = () => {
  const optionsBarClasses = classNames(cl.onlyPortraitMobile, cl.optionsBar);

  return (
    <div className={optionsBarClasses}>
      <ScoreInfo />
      <OptionsDropdown />
    </div>
  );
};

export default MobileOptionsBar;
