import React, { useEffect, useState, useRef } from 'react';
import cl from './Content.module.scss';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setSituations,
  setInningNumber,
  setCurrentCard,
  setFilteredCards,
  setPlaybackMode,
  setImagesData
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
  const playersInfo = useSelector(state => state.game.playersInfo);
  const gameId = useSelector(state => state.game.gameId);
  const dispatch = useDispatch();
  const situationsChildRef = useRef();
  const gameIdRef = useRef(0); //Delete later
  const scrollToRef = useRef(false);
  const queriesRef = useRef([]);

  useEffect(() => {
    function situationsConcat(member) {
      member.moments?.forEach(moment => {
        moment.filter &&
          (typeof moment.filter === 'object'
            ? newSituations.push(...moment.filter)
            : newSituations.push(moment.filter));
      });
    }

    function momentsDecompose(member, moments, inning, side) {
      newCards.push({
        inning_number: inning.number,
        ...member,
        moments: [moments[0]],
        type: 'Replacement',
        side
      });
      if (moments.length <= 1) return;

      moments[1].icons?.rect_text !== 'Replacement'
        ? newCards.push({ inning_number: inning.number, ...member, moments: moments.slice(1), side })
        : momentsDecompose(member, moments.slice(1), inning, side);
    }

    function newCardsConcat(team, inning, side) {
      team.forEach(member => {
        member.moments[0]?.icons?.rect_text !== 'Replacement'
          ? newCards.push({ inning_number: inning.number, ...member, side })
          : member.moments.length === 1
          ? newCards.push({ inning_number: inning.number, ...member, type: 'Replacement', side })
          : momentsDecompose(member, member.moments, inning, side);
        situationsConcat(member);
      });
    }

    const fetchImage = async who => {
      try {
        const response = await axios.get(`http://51.250.11.151:3030/logo/${playersInfo[who]}`, {
          responseType: 'arraybuffer'
        });
        dispatch(
          setImagesData({
            [who]: 'data:image/jpg;base64, ' + Buffer.from(response.data, 'binary').toString('base64')
          })
        );
      } catch (err) {
        setTimeout(() => fetchImage(who), 2000);
        console.log(err.message);
      }
    };

    const newSituations = ['All'];
    const newCards = [];

    innings.forEach(inning => {
      newCardsConcat(inning['top/guests'], inning, 'top');
      inning['bottom/owners'] && newCardsConcat(inning['bottom/owners'], inning, 'bottom');
    });

    /****************Images fetching*****************/

    newCards
      .filter(card => playersInfo[card.who])
      .forEach(card => {
        if (queriesRef.current.includes(card.who)) return;
        queriesRef.current.push(card.who);
        fetchImage(card.who);
      });

    /************************************************/

    const filteredCards = getFilteredCards(newCards);
    /*******************Delete later******************/
    if (gameIdRef.current !== gameId && playbackMode !== 'playOnline') {
      gameIdRef.current = gameId;
      dispatch(setInningNumber(1));
    }
    /*************************************************/
    setCards(newCards);
    dispatch(setFilteredCards(filteredCards));
    (playbackMode === 'play' || playbackMode === 'pause') &&
      Object.keys(currentCard).length === 0 &&
      dispatch(setCurrentCard(filteredCards[0]));
    playbackMode === 'playOnline' &&
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

    if (playbackMode === 'pause' && situationFilter === 'All') scrollToRef.current = true;

    playbackMode === 'playOnline' &&
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
    //   situationsChildRef.current.parentNode.scrollTop = situationsChildRef.current.offsetTop;
    //   // situationsChildRef.current.parentNode.scrollTop = 50;
    // }
    if (scrollToRef.current) {
      situationsChildRef.current.parentNode.scrollTop = situationsChildRef.current.offsetTop;
      scrollToRef.current = false;
    }

    playbackMode === 'playOnline' &&
      // setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });
      dispatch(setCurrentCard({ ...filteredCards.slice(-1)[0] }));
    // eslint-disable-next-line
  }, [filteredCards]);

  useEffect(() => {
    // if (Object.keys(currentCard).length === 0 || playbackMode !== 'playOnline' || !situationsChildRef.current)
    dispatch(setInningNumber(currentCard.inning_number || 1));
    currentCard.manualClick && dispatch(setPlaybackMode('pause'));
    if (Object.keys(currentCard).length === 0 || currentCard.manualClick || !situationsChildRef.current)
      return;
    situationsChildRef.current.parentNode.scrollTop = situationsChildRef.current.offsetTop;
    // eslint-disable-next-line
  }, [currentCard]);

  useEffect(() => {
    if (playbackMode !== 'playOnline') return;
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
