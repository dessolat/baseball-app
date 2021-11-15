import React, { useEffect, useState, useRef } from 'react';
import cl from './Content.module.scss';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';
import PlaysImg from 'images/plays.jpg';
import Pause from 'components/UI/buttons/Pause/Pause';
import Play from 'components/UI/buttons/Play';
import Repeat from 'components/UI/buttons/Repeat/Repeat';
import ContentVideos from '../ContentVideos/ContentVideos';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import { setSituationFilter } from 'redux/gameReducer';

const Content = ({ viewMode, setSituations }) => {
  const [playbackMode, setPlaybackMode] = useState('play');
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const innings = useSelector(state => state.game.innings);
  const inningNumber = useSelector(state => state.game.inningNumber);
  const situationFilter = useSelector(state => state.game.situationFilter);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const situationsChildRef = useRef();

  // **** Handle inning change ****
  useEffect(() => {
    setCurrentCard({});

    const newSituations = ['All'];
    const newCards = [];
    const newInnings =
      inningNumber !== null ? innings.filter(inning => inning.number === inningNumber) : innings;
    newInnings.forEach(inning => {
      inning['top/guests'].forEach(guest => {
        newCards.push({ inning_number: inning.number, ...guest });
        guest.moments.slice(-1)[0].filter && newSituations.push(...guest.moments.slice(-1)[0].filter);
      });
      inning['bottom/owners']?.forEach(owner => {
        newCards.push({ inning_number: inning.number, ...owner });
        owner.moments?.slice(-1)[0].filter && newSituations.push(...owner.moments.slice(-1)[0].filter);
      });
    });
    setCards(newCards);
    setSituations([...new Set(newSituations)]);
  }, [inningNumber, innings]);

  useEffect(() => {
		dispatch(setSituationFilter('All'))
  }, [inningNumber]);

  useEffect(() => {
    setCurrentCard({});
    const filteredCards =
      situationFilter !== 'All'
        ? cards.filter(card => card.moments.slice(-1)[0].filter?.includes(situationFilter))
        : cards;

    setFilteredCards(filteredCards);
  }, [situationFilter, cards]);

  const renderTab = tab => {
    switch (tab) {
      case 'lineup':
      case 'box':
        return <></>;
      case 'plays':
        return <img src={PlaysImg} alt='plays' width='100%' />;
      default:
        return <ContentVideos viewMode={viewMode} currentCard={currentCard} />;
    }
  };

  const playbackModeClick = e => {
    setPlaybackMode(e.currentTarget.name);
  };

  return (
    <section className='container'>
      <div className={cl.content}>
        <ContentSituationsList
          ref={situationsChildRef}
          cards={filteredCards}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
        <div className={cl.controlsWrapper}>
          <ContentPitcher currentCard={currentCard} />
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
        <div className={cl.graphics}>{renderTab(searchParams.get('tab'))}</div>
      </div>
    </section>
  );
};

export default Content;
