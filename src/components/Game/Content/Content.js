import React, { useEffect, useState, useRef } from 'react';
import cl from './Content.module.scss';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';
import PlaysImg from 'images/plays.jpg';
import PlayPause from 'components/UI/buttons/PlayPause/PlayPause';
import Repeat from 'components/UI/buttons/Repeat/Repeat';
import ContentVideos from '../ContentVideos/ContentVideos';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import { setSituations, setPlaybackMode, setInningNumber } from 'redux/gameReducer';

const Content = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const innings = useSelector(state => state.game.innings);
  const inningNumber = useSelector(state => state.game.inningNumber);
  const situationFilter = useSelector(state => state.game.situationFilter);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const situationsChildRef = useRef();
  const gameId = useSelector(state => state.game.gameId);
  const gameIdRef = useRef(0); //Delete later

  useEffect(() => {
    if (playbackMode === 'play' && inningNumber !== innings.length) {
      dispatch(setInningNumber(innings.length));
      return;
    }

    const newSituations = ['All'];
    const newCards = [];
    const newInnings =
      inningNumber !== null ? innings.filter(inning => inning.number === inningNumber) : innings;
    newInnings.forEach(inning => {
      inning['top/guests'].forEach(guest => {
        newCards.push({ inning_number: inning.number, ...guest });
        guest.moments.slice(-1)[0].filter &&
          (typeof guest.moments.slice(-1)[0].filter === 'object'
            ? newSituations.push(...guest.moments.slice(-1)[0].filter)
            : newSituations.push(guest.moments.slice(-1)[0].filter));
      });
      inning['bottom/owners']?.forEach(owner => {
        newCards.push({ inning_number: inning.number, ...owner });
        owner.moments?.slice(-1)[0].filter &&
          (typeof owner.moments.slice(-1)[0].filter === 'object'
            ? newSituations.push(...owner.moments.slice(-1)[0].filter)
            : newSituations.push(owner.moments.slice(-1)[0].filter));
      });
    });
    const filteredCards =
      situationFilter !== 'All'
        ? newCards.filter(card => card.moments.slice(-1)[0].filter?.includes(situationFilter))
        : newCards;

    if (gameIdRef.current !== gameId && playbackMode !== 'play') {//Delete later
      
      gameIdRef.current = gameId; //Delete later
      dispatch(setInningNumber(null)); //Delete later
    } 
    setCards(newCards);
    setFilteredCards(filteredCards);
    playbackMode === 'play' &&
      (filteredCards.length !== 0
        ? setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 })
        : setCurrentCard({}));

    dispatch(setSituations([...new Set(newSituations)]));
    // eslint-disable-next-line
  }, [innings]);

  useEffect(() => {
    const newSituations = ['All'];
    const newCards = [];
    const newInnings =
      inningNumber !== null ? innings.filter(inning => inning.number === inningNumber) : innings;
    newInnings.forEach(inning => {
      inning['top/guests'].forEach(guest => {
        newCards.push({ inning_number: inning.number, ...guest });
        guest.moments?.slice(-1)[0]?.filter &&
          (typeof guest.moments.slice(-1)[0].filter === 'object'
            ? newSituations.push(...guest.moments.slice(-1)[0].filter)
            : newSituations.push(guest.moments.slice(-1)[0].filter));
      });
      inning['bottom/owners']?.forEach(owner => {
        newCards.push({ inning_number: inning.number, ...owner });
        owner.moments?.slice(-1)[0].filter &&
          (typeof owner.moments.slice(-1)[0].filter === 'object'
            ? newSituations.push(...owner.moments.slice(-1)[0].filter)
            : newSituations.push(owner.moments.slice(-1)[0].filter));
      });
    });
    const filteredCards =
      situationFilter !== 'All'
        ? newCards.filter(card => card.moments.slice(-1)[0].filter?.includes(situationFilter))
        : newCards;

    setCards(newCards);
    setFilteredCards(filteredCards);
    playbackMode === 'pause' && setCurrentCard({ ...filteredCards[0], row_number: 0 });
    playbackMode === 'play' &&
      (filteredCards.length !== 0
        ? setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 })
        : setCurrentCard({}));
    dispatch(setSituations([...new Set(newSituations)]));
    // eslint-disable-next-line
  }, [inningNumber]);

  useEffect(() => {
    if (cards.length === 0) return;
    const filteredCards =
      situationFilter !== 'All'
        ? cards.filter(card =>
            card.moments.length > 0 ? card.moments.slice(-1)[0].filter?.includes(situationFilter) : false
          )
        : cards;

    setFilteredCards(filteredCards);
    playbackMode === 'pause' && setCurrentCard({ ...filteredCards[0], row_number: 0 });
    playbackMode === 'play' &&
      setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });
    // eslint-disable-next-line
  }, [situationFilter]);

  useEffect(() => {
    if (filteredCards.length === 0) {
      // setCurrentCard({});    //Delete later
      return;
    }
    playbackMode === 'play' &&
      setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });
    // eslint-disable-next-line
  }, [filteredCards]);

  useEffect(() => {
    if (Object.keys(currentCard).length === 0 || playbackMode !== 'play' || !situationsChildRef.current)
      return;
    situationsChildRef.current.parentNode.scrollTop = situationsChildRef.current.offsetTop;
    // eslint-disable-next-line
  }, [currentCard]);

  useEffect(() => {
    if (playbackMode !== 'play') return;
    inningNumber !== innings.length
      ? dispatch(setInningNumber(innings.length))
      : setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });

    // eslint-disable-next-line
  }, [playbackMode]);

  /*********** TO-DO **************
	1. In playbackMode === "play", when clicking the ContentSituationsListItem change the playbackMode to "pause"		(DONE)
	2. When paused - don't switch the current card  																																(DONE)
	3. Change default state of playbackMode to "pause"																															(DONE)
	4. Change play/pause buttons appearance																																					(DONE)
	5. Make scrolling to latest filterCard when playbackMode changed to "play"																			(DONE)
	6. Add row_number key to current_card																																						(DONE)
	7. Make fetch more often																																												(DONE)
	8. Update json files in the server, make them 4-5 more count																										(DONE)
	9. Make switching current inning in playback mode "play"																												(DONE)
	10. Add colors and labels for circles in video																																	(DONE)
	11. Добавить ĸ VideoEventsListItem ĸружĸам - цифру moment_id (вроде)																						(DONE)
	12. Сделать отображение второго ĸружĸа ĸ VideoEventsListItem																										(DONE)
	13. Сделать чтобы нельзя было отжать аĸтивную ĸарточĸу																													(DONE)
	14. Сделать поле с ĸнопĸой и добавлением id игры для теста
	15. Добавить ĸ фильтрам цифру с ĸоличеством ĸарточеĸ данного типа
	16. При создании массива cards - парсить игроĸа на наличие замены в первом моменте и если она есть, то
	17. Добавить этот момент (замену) ĸаĸ отдельную ĸарточĸу (объеĸт).
	18. Промежуточные данные в прямоугольниĸах сделать через map массива прямоугольниĸов (сделать
			 массив предварительно)
	19. Ask to add field "game_over" to not fetch many times
	********************************/

  const renderTab = tab => {
    switch (tab) {
      case 'lineup':
      case 'box':
        return <></>;
      case 'plays':
        return <img src={PlaysImg} alt='plays' width='100%' />;
      default:
        return <ContentVideos currentCard={currentCard} />;
    }
  };

  const playbackModeClick = e => {
    const newMode =
      e.currentTarget.name === 'play-pause' ? (playbackMode === 'play' ? 'pause' : 'play') : 'repeat';
    dispatch(setPlaybackMode(newMode));
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
            <PlayPause
              name='play-pause'
              onClick={playbackModeClick}
              className={playbackMode !== 'repeat' ? cl.active : ''}
              playbackMode={playbackMode}
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
