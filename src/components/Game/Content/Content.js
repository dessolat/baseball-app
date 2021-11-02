import React, { useState } from 'react';
import cl from './Content.module.scss';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';
import PlaysImg from 'images/plays.jpg';
import Pause from 'components/UI/buttons/Pause/Pause';
import Play from 'components/UI/buttons/Play';
import Repeat from 'components/UI/buttons/Repeat/Repeat';
import useQuery from 'hooks/useQuery';
import ContentVideos from '../ContentVideos/ContentVideos';

const Content = ({ viewMode, innings, inningNumber }) => {
  const [playbackMode, setPlaybackMode] = useState('play');
  const query = useQuery();

  const renderTab = tab => {
    switch (tab) {
      case 'videos':
        return <ContentVideos viewMode={viewMode} />;
      case 'plays':
        return <img src={PlaysImg} alt='plays' width='100%' />;
      default:
        break;
    }
  };

  const playbackModeClick = e => {
    setPlaybackMode(e.currentTarget.name);
  };

  return (
    <section className='container'>
      <div className={cl.content}>
        <ContentSituationsList innings={innings} inningNumber={inningNumber} />
        <div className={cl.controlsWrapper}>
          <p className={cl.playerName}>
            Pitcher: <span>LEONOV</span>
          </p>
          <div className={cl.controls}>
            <Play
              name='play'
              onClick={playbackModeClick}
              className={playbackMode === 'play' ? cl.active : ''}
            />
            <Pause
              name='pause'
              onClick={playbackModeClick}
              className={playbackMode === 'pause' ? cl.active : ''}
            />
            <Repeat
              name='repeat'
              onClick={playbackModeClick}
              className={playbackMode === 'repeat' ? cl.active : ''}
            />
          </div>
        </div>
        <div className={cl.graphics}>{renderTab(query.get('tab'))}</div>
      </div>
    </section>
  );
};

export default Content;
