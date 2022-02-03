import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
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
  setImagesData,
  setCurrentMoment
} from 'redux/gameReducer';
import ContentFooter from '../ContentFooter/ContentFooter';
import ContentGraphics from '../ContentGraphics/ContentGraphics';
import { getBeforeAfterFlags, getSearchParam, setSearchParam } from 'utils';
import ContentBox from '../ContentBox/ContentBox';

const Content = ({ currentTab }) => {
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
  const beforeAfterRef = useRef({});

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

    const fetchImage = async id => {
      try {
        const response = await axios.get(`http://51.250.11.151:3030/logo/${playersInfo[id]}`, {
          responseType: 'arraybuffer',
          timeout: 2500
        });
        dispatch(
          setImagesData({
            [id]: 'data:image/jpg;base64, ' + Buffer.from(response.data, 'binary').toString('base64')
            // [who]: 'data:image/jpg;base64, ' + Buffer.from(response.data, 'binary').toString('base64')
          })
        );
      } catch (err) {
        setTimeout(() => fetchImage(id), 2000);
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
    // const testArr = []
    // console.log(playersInfo);
    // console.log(playersInfo[166]);
    // newCards.filter(card => playersInfo[card.who_id]).forEach(card => testArr.push(card.who_id))
    // console.log(testArr.includes(166));

    Object.entries(playersInfo)

      // .filter(card => playersInfo[card.who_id])
      .forEach(entry => {
        if (queriesRef.current.includes(entry[0])) return;
        // if (queriesRef.current.includes(card.who_id)) return;
        queriesRef.current.push(entry[0]);
        // queriesRef.current.push(card.who_id);
        fetchImage(entry[0]);
        // fetchImage(card.who_id);
      });

    /************************************************/

    const newFilteredCards = getFilteredCards(newCards);
    beforeAfterRef.current = getBeforeAfterFlags(newFilteredCards, innings);

    /*******************Delete later******************/
    if (gameIdRef.current !== gameId && playbackMode !== 'playOnline') {
      gameIdRef.current = gameId;
      dispatch(setInningNumber(1));
    }
    /*************************************************/
    setCards(newCards);
    dispatch(setFilteredCards(newFilteredCards));

    if ((playbackMode === 'play' || playbackMode === 'pause') && Object.keys(currentCard).length === 0) {
      const card = +getSearchParam('card');
      let cardIndex =
        card !== undefined ? newFilteredCards.findIndex(player => player.moments[0].inner.id === card) : 0;

      if (cardIndex === -1) cardIndex = 0;

      dispatch(setCurrentCard(newFilteredCards[cardIndex]));
    }

    playbackMode === 'playOnline' &&
      (newFilteredCards.length !== 0
        ? dispatch(setCurrentCard({ ...newFilteredCards.slice(-1)[0] }))
        : dispatch(setCurrentCard({})));

    dispatch(setSituations(newSituations));
    // eslint-disable-next-line
  }, [innings]);

  useLayoutEffect(() => {
    if (cards.length === 0) return;

    const filteredCards = getFilteredCards(cards);
    beforeAfterRef.current = getBeforeAfterFlags(filteredCards, innings);

    dispatch(setFilteredCards(filteredCards));
    // playbackMode === 'pause' && setCurrentCard({ ...filteredCards[0], row_number: 0 });
    if (playbackMode === 'pause' && situationFilter !== 'All') {
      dispatch(setCurrentCard(filteredCards[0]));
      scrollToRef.current = true;
    }

    if (playbackMode === 'pause' && situationFilter === 'All') scrollToRef.current = true;

    if (playbackMode === 'playOnline') {
      // setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });
      const lastCard = filteredCards.slice(-1)[0];
      dispatch(setCurrentCard(lastCard));
    }
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
    if (scrollToRef.current && situationsChildRef.current) {
      situationsChildRef.current.parentNode.scrollTop =
        situationsChildRef.current.offsetTop + situationsChildRef.current.clientHeight / 2 - 200;
      scrollToRef.current = false;
    }

    playbackMode === 'playOnline' &&
      // setCurrentCard({ ...filteredCards.slice(-1)[0], row_number: filteredCards.length - 1 });
      dispatch(setCurrentCard({ ...filteredCards.slice(-1)[0] }));
    // eslint-disable-next-line
  }, [filteredCards]);

  useEffect(() => {
    if (Object.keys(currentCard).length === 0) return;

    const cardId = currentCard.moments && currentCard.moments[0].inner.id;
    setSearchParam('card', cardId);

    dispatch(setInningNumber(currentCard.inning_number || 1));
    currentCard.manualClick && dispatch(setPlaybackMode('pause'));

    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);
    currentCard.manualMoment
      ? dispatch(setCurrentMoment(newMoments[0] || {}))
      : dispatch(setCurrentMoment(newMoments.slice(-1)[0] || {}));

    if (currentCard.manualClick || !situationsChildRef.current) return;
    situationsChildRef.current.parentNode.scrollTop =
      situationsChildRef.current.offsetTop + situationsChildRef.current.clientHeight / 2 - 200;

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

  const isVideo = innings[0]['top/guests'][0].moments[0].video !== null;
	const contentClass = isVideo ? cl.content : cl.contentNoVideo
  return (
    <>
      {currentTab !== 'box' ? (
        <section className='container'>
          <div className={contentClass}>
            <ContentSituationsList
              ref={situationsChildRef}
              filteredCards={filteredCards}
              currentCard={currentCard}
              beforeAfterData={beforeAfterRef.current}
            />
            {isVideo && <ContentFooter />}
            <ContentGraphics currentTab={currentTab} isVideo={isVideo}/>
          </div>
        </section>
      ) : (
        <ContentBox />
      )}
    </>
  );
};

export default Content;
