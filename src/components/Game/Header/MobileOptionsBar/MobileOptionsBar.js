import classNames from 'classnames';
import cl from './MobileOptionsBar.module.scss';
import OptionsBtn from './OptionsBtn';
import ScoreInfo from './ScoreInfo';

const MobileOptionsBar = () => {
  const optionsBarClasses = classNames(cl.onlyPortraitMobile, cl.optionsBar);

  return (
    <div className={optionsBarClasses}>
      <ScoreInfo />
      <OptionsBtn />
    </div>
  );
};

export default MobileOptionsBar;
