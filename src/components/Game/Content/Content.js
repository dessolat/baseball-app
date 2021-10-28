import React, { useState } from 'react';
import cl from './Content.module.scss';
// import $ from 'jquery';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';
import PlaysImg from 'images/plays.jpg';
import Pause from 'components/UI/buttons/Pause/Pause';
import Play from 'components/UI/buttons/Play';
import Repeat from 'components/UI/buttons/Repeat/Repeat';
import useQuery from 'hooks/useQuery';

const Content = ({ viewMode, contentSituationsList }) => {
  const [playbackMode, setPlaybackMode] = useState('play');
	const query = useQuery()

  const renderTab = tab => {
    switch (tab) {
      case 'videos':
        return (
          <iframe
            width='100%'
            height='100%'
            src='https://www.youtube.com/embed/gN7RdRGmBF4?autoplay=1'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
        );
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
        <ContentSituationsList situations={contentSituationsList} />
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
