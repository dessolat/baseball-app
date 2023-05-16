import cl from './OptionsDropdown.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsMobileScoreboard, toggleIsMobileTimeline } from 'redux/sharedReducer';
import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import classNames from 'classnames';

const ComponentsTogglers = () => {
	const isMobileScoreboard = useSelector(s => s.shared.isMobileScoreboard)
	const isMobileTimeline = useSelector(s => s.shared.isMobileTimeline)

	const dispatch = useDispatch()

	const scoreboardRowClasses = classNames(cl.row, cl.onlyMobilePortrait)
	const effectsRowClasses = classNames(cl.row, cl.onlyMobileLandscape)
  return (
    <div className={cl.componentsTogglers}>
      <div className={scoreboardRowClasses}>
        <span className={cl.title}>Scoreboard</span>
        <SimpleToggler checked={isMobileScoreboard} onChange={() => dispatch(toggleIsMobileScoreboard())} />
      </div>
      <div className={cl.row}>
        <span className={cl.title}>Timeline</span>
        <SimpleToggler checked={isMobileTimeline} onChange={() => dispatch(toggleIsMobileTimeline())} />
      </div>
      <div className={effectsRowClasses}>
        <span className={cl.title}>Effects</span>
        <SimpleToggler checked={false} onChange={() => {}} />
      </div>
    </div>
  );
};

export default ComponentsTogglers;
