import React, { useEffect, useState } from 'react';
import cl from './Content.module.scss';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';
import PlaysImg from 'images/plays.jpg';
import Pause from 'components/UI/buttons/Pause/Pause';
import Play from 'components/UI/buttons/Play';
import Repeat from 'components/UI/buttons/Repeat/Repeat';
import useQuery from 'hooks/useQuery';
import ContentVideos from '../ContentVideos/ContentVideos';
import { useSelector } from 'react-redux';

const Content = ({ viewMode }) => {
	const [playbackMode, setPlaybackMode] = useState('play');
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const innings = useSelector(state => state.game.innings);
	const inningNumber = useSelector(state => state.game.inningNumber);
  const query = useQuery();

  // **** Handle inning change ****
  useEffect(() => {
    setCurrentCard({});

    const newCards = [];
    const newInnings =
      inningNumber !== null ? innings.filter(inning => inning.number === inningNumber) : innings;
    newInnings.forEach(inning => {
      inning['top/guests'].forEach(guest => newCards.push({ inning_number: inning.number, ...guest }));
      inning['bottom/owners']?.forEach(owner => newCards.push({ inning_number: inning.number, ...owner }));
    });
    setCards(newCards);
  }, [inningNumber, innings]);

  const renderTab = tab => {
    switch (tab) {
      case 'videos':
        return <ContentVideos viewMode={viewMode} currentCard={currentCard} />;
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
        <ContentSituationsList
          cards={cards}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
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
