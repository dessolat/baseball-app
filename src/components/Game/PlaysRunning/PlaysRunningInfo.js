import classNames from 'classnames';
import cl from './PlaysRunning.module.scss';
import PlaysRunningInfoList from './PlaysRunningInfoList';
import { useSelector } from 'react-redux';

const PlaysRunningInfo = () => {
  const runState = useSelector(s => s.game.runState);

  const wrapperClasses = classNames(cl.info, {
    [cl.dnone]: runState !== 'Info'
  });
  return (
    <div className={wrapperClasses}>
      <p className={cl.subHeader}>Running</p>
      <PlaysRunningInfoList />
      {/* <div className={cl.leftArrowWrapper}>
        <Arrow onClick={() => setRunningMode('Field')} />
      </div> */}
    </div>
  );
};

export default PlaysRunningInfo;
