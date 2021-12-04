import React, { useEffect, useState, useRef } from 'react';
import cl from './Content.module.scss';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSituations,
  setInningNumber,
  setCurrentCard,
  setFilteredCards,
  setPlaybackMode
} from 'redux/gameReducer';
import ContentFooter from '../ContentFooter/ContentFooter';
import ContentGraphics from '../ContentGraphics/ContentGraphics';

const Content = () => {
  const [cards, setCards] = useState([]);
  const innings = useSelector(state => state.game.innings);
  const situationFilter = useSelector(state => state.game.situationFilter);
  const currentCard = useSelector(state => state.game.currentCard);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const gameId = useSelector(state => state.game.gameId);
  const dispatch = useDispatch();
  const situationsChildRef = useRef();
  const gameIdRef = useRef(0); //Delete later

  useEffect(() => {
    function situationsConcat(member) {
      member.moments?.forEach(moment => {
        moment.filter &&
          (typeof moment.filter === 'object'
            ? newSituations.push(...moment.filter)
            : newSituations.push(moment.filter));
      });
    }

    function newCardsConcat(team, inning, side) {
      team.forEach(member => {
        member.moments[0].icons?.rect_text !== 'Replacement'
          ? newCards.push({ inning_number: inning.number, ...member, side })
          : member.moments.length === 1
          ? newCards.push({ inning_number: inning.number, ...member, type: 'Replacement', side })
          : newCards.push(
              {
                inning_number: inning.number,
                ...member,
                moments: [member.moments[0]],
                type: 'Replacement',
                side
              },
              { inning_number: inning.number, ...member, moments: member.moments.slice(1), side }
            );

        situationsConcat(member);
      });
    }

    const newSituations = ['All'];
    const newCards = [];

    innings.forEach(inning => {
      newCardsConcat(inning['top/guests'], inning, 'top');
      inning['bottom/owners'] && newCardsConcat(inning['bottom/owners'], inning, 'bottom');
    });

    const filteredCards = getFilteredCards(newCards);
    /*******************Delete later******************/
    if (gameIdRef.current !== gameId && playbackMode !== 'play') {
      gameIdRef.current = gameId;
      dispatch(setInningNumber(1));
    }
    /*************************************************/
    setCards(newCards);
    dispatch(setFilteredCards(filteredCards));
    playbackMode === 'pause' &&
      Object.keys(currentCard).length === 0 &&
      dispatch(setCurrentCard(filteredCards[0]));
    playbackMode === 'play' &&
      (filteredCards.length !== 0
        ? // ? setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 })
          dispatch(setCurrentCard({ ...filteredCards.slice(-1)[0] }))
        : dispatch(setCurrentCard({})));

    dispatch(setSituations(newSituations));
    // eslint-disable-next-line
  }, [innings]);

  useEffect(() => {
    if (cards.length === 0) return;

    const filteredCards = getFilteredCards(cards);

    dispatch(setFilteredCards(filteredCards));
    // playbackMode === 'pause' && setCurrentCard({ ...filteredCards[0], row_number: 0 });
    playbackMode === 'pause' &&
      situationFilter !== 'All' &&
      dispatch(setCurrentCard({ ...filteredCards[0] }));

    playbackMode === 'play' &&
      // setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });
      dispatch(setCurrentCard({ ...filteredCards.slice(-1)[0] }));
    // eslint-disable-next-line
  }, [situationFilter]);

  useEffect(() => {
    if (filteredCards.length === 0) {
      // setCurrentCard({});    //Delete later
      return;
    }

    //Add parent node checking on null or undefined
    //Add field 'scroll' (bool) to setFilteredCards to know when scroll
    // if (playbackMode === 'pause' && situationFilter === 'All') {
    // 	console.log(123)
    //   situationsChildRef.current.parentNode.scrollTop = situationsChildRef.current.offsetTop;
    //   // situationsChildRef.current.parentNode.scrollTop = 50;
    // }
    playbackMode === 'play' &&
      // setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });
      dispatch(setCurrentCard({ ...filteredCards.slice(-1)[0] }));
    // eslint-disable-next-line
  }, [filteredCards]);

  useEffect(() => {
    // if (Object.keys(currentCard).length === 0 || playbackMode !== 'play' || !situationsChildRef.current)
    dispatch(setInningNumber(currentCard.inning_number || 1));
    currentCard.manualClick && dispatch(setPlaybackMode('pause'));
    if (Object.keys(currentCard).length === 0 || currentCard.manualClick || !situationsChildRef.current)
      return;
    situationsChildRef.current.parentNode.scrollTop = situationsChildRef.current.offsetTop;
    // eslint-disable-next-line
  }, [currentCard]);

  useEffect(() => {
    if (playbackMode !== 'play') return;
    // inningNumber !== innings.length
    //   ? dispatch(setInningNumber(innings.length))
    // : setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });
    dispatch(setCurrentCard({ ...filteredCards.slice(-1)[0] }));

    // eslint-disable-next-line
  }, [playbackMode]);

  const getFilteredCards = cards =>
    situationFilter !== 'All'
      ? cards.filter(card =>
          card.moments.length > 0
            ? card.moments.some(moment => moment.filter?.includes(situationFilter))
            : false
        )
      : cards;

  return (
    <section className='container'>
      <div className={cl.content}>
        <ContentSituationsList ref={situationsChildRef} cards={filteredCards} currentCard={currentCard} />
        <ContentFooter />
        <ContentGraphics />
      </div>
    </section>
  );
};

export default Content;
