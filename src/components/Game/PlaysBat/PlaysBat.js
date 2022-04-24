import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCard, setCurrentMoment, setPlaybackMode } from 'redux/gameReducer';
import cl from './PlaysBat.module.scss';
import PlaysBatFooter from './PlaysBatFooter';
import PlaysBatHeader from './PlaysBatHeader';
import PlaysBatMedia from './PlaysBatMedia';

const PlaysBat = ({ currentMoment, setHittingMode }) => {
  const { metering, events } = currentMoment;
  const { data_2d, swing_index, plane_index, impact_index } = metering?.bat || {};

  const [currentLine, setCurrentLine] = useState('');
  const [curvePath, setCurvePath] = useState('');
  const [linesPaths, setLinesPaths] = useState(['', '', '']);
  const [frame, setFrame] = useState(0);

  const playbackMode = useSelector(state => state.game.playbackMode);
  const currentCard = useSelector(state => state.game.currentCard);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const dispatch = useDispatch();

  const maxFrameRef = useRef(null);
  const timeoutRef = useRef(null);
  const playRef = useRef(null);

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(playRef.current);
    },
    []
  );

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    clearTimeout(playRef.current);

    if (Object.keys(currentMoment).length === 0 || !data_2d) {
      setCurvePath('');
      setLinesPaths(['', '', '']);

      if (playbackMode !== 'pause') {
        const newMoments = [];
        currentCard.type !== 'Replacement'
          ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
          : newMoments.push(currentCard.moments[0]);

        const momentIndex = newMoments?.findIndex(moment => moment.inner?.id === currentMoment?.inner?.id);
        const cardIndex = filteredCards.findIndex(
          card => card.moments[0].inner.id === currentCard.moments[0].inner.id
        );

        playRef.current = setTimeout(() => {
          // setFrame(0)
          if (
            (momentIndex >= currentCard.moments.length - 1 && cardIndex >= filteredCards.length - 1) ||
            momentIndex === -1
          ) {
            dispatch(setPlaybackMode('pause'));
            return;
          }
          if (momentIndex >= currentCard.moments.length - 1) {
            dispatch(setCurrentCard({ ...filteredCards[cardIndex + 1], manualMoment: true }));
            return;
          }
          dispatch(setCurrentMoment(newMoments[momentIndex + 1]));
        }, 2000);
      }

      return;
    }
    maxFrameRef.current = data_2d?.length || 0;
    setFrame(1);
    setLinesPaths(['', '', '']);
    // eslint-disable-next-line
  }, [currentMoment, data_2d, events]);

  useEffect(() => {
    if (playbackMode === 'pause') clearTimeout(playRef.current);

    if (frame === 0 || (!data_2d && playbackMode === 'pause')) return;

    const xShift = -450;
    const yShift = -200;

    if (frame > maxFrameRef.current) {
      maxFrameRef.current = null;

      if (data_2d) {
        const coord0 = data_2d[swing_index];
        const coord1 = data_2d[plane_index];
        const coord2 = data_2d[impact_index];
        const line0 = `M${coord0.up[0] + xShift} ${coord0.up[1] + yShift}L${coord0.bottom[0] + xShift} ${
          coord0.bottom[1] + yShift
        }`;
        const line1 = `M${coord1.up[0] + xShift} ${coord1.up[1] + yShift}L${coord1.bottom[0] + xShift} ${
          coord1.bottom[1] + yShift
        }`;
        const line2 = `M${coord2.up[0] + xShift} ${coord2.up[1] + yShift}L${coord2.bottom[0] + xShift} ${
          coord2.bottom[1] + yShift
        }`;
        setLinesPaths([line0, line1, line2]);
      }

      const newMoments = [];
      currentCard.type !== 'Replacement'
        ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
        : newMoments.push(currentCard.moments[0]);

      const momentIndex = newMoments?.findIndex(moment => moment.inner?.id === currentMoment?.inner?.id);
      const cardIndex = filteredCards.findIndex(
        card => card.moments[0].inner.id === currentCard.moments[0].inner.id
      );

      if (playbackMode !== 'pause') {
        playRef.current = setTimeout(() => {
          // setFrame(0)
          if (
            (momentIndex >= currentCard.moments.length - 1 && cardIndex >= filteredCards.length - 1) ||
            momentIndex === -1
          ) {
            dispatch(setPlaybackMode('pause'));
            return;
          }
          if (momentIndex >= currentCard.moments.length - 1) {
            dispatch(setCurrentCard({ ...filteredCards[cardIndex + 1], manualMoment: true }));
            return;
          }
          dispatch(setCurrentMoment(newMoments[momentIndex + 1]));
        }, 2000);
      }

      return;
    }

    let newCurve = '';
    const slicedArr = data_2d.slice(0, frame);

    slicedArr.forEach(
      (coord, i) =>
        (newCurve +=
          i === 0
            ? `M${coord.up[0] + xShift} ${coord.up[1] + yShift}`
            : `L${coord.up[0] + xShift} ${coord.up[1] + yShift}`)
    );

    let backPath = '';
    slicedArr
      .reverse()
      .forEach(coord => (backPath += `L${coord.bottom[0] + xShift} ${coord.bottom[1] + yShift}`));
    newCurve += backPath + 'Z';
    setCurvePath(newCurve);

    timeoutRef.current = setTimeout(() => setFrame(prev => prev + 1), 10);
    // eslint-disable-next-line

    return () => {
      clearTimeout(playRef.current);
    };
    // eslint-disable-next-line
  }, [frame]);

  useEffect(() => {
    if (playbackMode === 'pause') {
      clearTimeout(playRef.current);
      return;
    }

    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);

    const momentIndex = newMoments?.findIndex(moment => moment.inner?.id === currentMoment?.inner?.id);
    const cardIndex = filteredCards.findIndex(
      card => card.moments[0].inner.id === currentCard.moments[0].inner.id
    );

    playRef.current = setTimeout(() => {
      // setFrame(0)
      if (
        (momentIndex >= currentCard.moments.length - 1 && cardIndex >= filteredCards.length - 1) ||
        momentIndex === -1
      ) {
        console.log('here');
        dispatch(setPlaybackMode('pause'));
        return;
      }
      if (momentIndex >= currentCard.moments.length - 1) {
        dispatch(setCurrentCard({ ...filteredCards[cardIndex + 1], manualMoment: true }));
        return;
      }
      dispatch(setCurrentMoment(newMoments[momentIndex + 1]));
    }, 2000);
    // eslint-disable-next-line
  }, [playbackMode]);

  const handleDotClick = str => () => setCurrentLine(str);

  return (
    <div className={cl.bat}>
      <PlaysBatHeader bat={currentMoment.metering?.bat} />
      <PlaysBatMedia
        metering={metering}
        curvePath={curvePath}
        linesPaths={linesPaths}
        currentLine={currentLine}
      />
      <PlaysBatFooter
        currentLine={currentLine}
        currentMoment={currentMoment}
        handleDotClick={handleDotClick}
        frame={frame}
      />
      <div className={cl.arrowWrapper}>
        <Arrow direction='right' onClick={() => setHittingMode('Stats')} />
      </div>
    </div>
  );
};

export default PlaysBat;
