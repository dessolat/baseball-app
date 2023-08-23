import NoVideoScreen from 'components/Game/Video/NoVideoScreen';
import cl from './PitchVideo.module.scss';

const BroadcastPitchVideos = () => {
  return (
    <>
      <div className={cl.topLeftVideo} style={{ position: 'relative' }}>
        <NoVideoScreen />
      </div>
      <div className={cl.topRightVideo} style={{ position: 'relative' }}>
        <NoVideoScreen />
      </div>
      <div className={cl.bottomVideo} style={{ position: 'relative' }}>
        <NoVideoScreen />
      </div>
    </>
  );
};

export default BroadcastPitchVideos;
