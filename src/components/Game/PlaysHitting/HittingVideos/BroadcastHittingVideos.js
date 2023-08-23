import NoVideoScreen from 'components/Game/Video/NoVideoScreen';
import clPlays from '../PlaysHitting.module.scss';
import cl from './HittingVideo.module.scss';

const BroadcastHittingVideos = () => {
  return (
    <div className={clPlays.videos}>
      <div className={cl.topLeftVideo} style={{ position: 'relative' }}>
        <NoVideoScreen />
      </div>
      <div className={cl.topRightVideo} style={{ position: 'relative' }}>
        <NoVideoScreen />
      </div>
      <div className={cl.bottomLeftVideo} style={{ position: 'relative' }}>
        <NoVideoScreen />
      </div>
      <div className={cl.bottomRightVideo} style={{ position: 'relative' }}>
        <NoVideoScreen />
      </div>
    </div>
  );
};

export default BroadcastHittingVideos;
