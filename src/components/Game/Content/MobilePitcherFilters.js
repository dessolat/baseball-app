// import { useSelector } from 'react-redux';
// import ContentControls from '../ContentControls/ContentControls';
import classNames from 'classnames';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import cl from './Content.module.scss';

const MobilePitcherFilters = () => {
  // const isVideo = useSelector(state => state.game.isVideo);

	const eventsWrapperClasses = classNames(cl.mobileOnlyPortrait, cl.eventsWrapper)
  return (
    <div className={cl.mobilePitcherFilters}>
      <ContentPitcher />

      <div className={eventsWrapperClasses}>
        <PlaysEvents />
      </div>
      {/* <ContentControls noPlayPause={!isVideo} isPlayOnline={false} /> */}
    </div>
  );
};

export default MobilePitcherFilters;
