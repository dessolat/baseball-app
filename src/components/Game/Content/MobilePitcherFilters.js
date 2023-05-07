import { useSelector } from 'react-redux';
import ContentControls from '../ContentControls/ContentControls';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import cl from './Content.module.scss';

const MobilePitcherFilters = () => {
  const isVideo = useSelector(state => state.game.isVideo);

  return (
    <div className={cl.mobilePitcherFilters}>
      <ContentPitcher />
      <ContentControls noPlayPause={!isVideo} isPlayOnline={false} />
    </div>
  );
};

export default MobilePitcherFilters;
