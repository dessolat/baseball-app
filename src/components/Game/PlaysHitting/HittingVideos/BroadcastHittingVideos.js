import NoVideoScreen from 'components/Game/Video/NoVideoScreen';
import clPlays from '../PlaysHitting.module.scss';
import cl from './HittingVideo.module.scss';
import { useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setCurrentCard, setCurrentMoment } from 'redux/gameReducer';

const BroadcastHittingVideos = () => {
	const currentMoment = useSelector(s => s.game.currentMoment, shallowEqual);
  const currentCard = useSelector(s => s.game.currentCard, shallowEqual);
  const preferredVideoState = useSelector(s => s.game.preferredVideoState);
  const videoLengthMode = useSelector(s => s.game.videoLengthMode);
  const preview = useSelector(s => s.game.preview);
  const filteredCards = useSelector(s => s.game.filteredCards, shallowEqual);
  const isLastMomentMode = useSelector(s => s.game.isLastMomentMode);
  const playbackMode = useSelector(s => s.game.playbackMode);

  const dispatch = useDispatch();

  const nextMomentTimeoutRef = useRef();
  const intervalRef = useRef(null);
  const videoHandlingTimeoutRef = useRef();
  const modeRef = useRef('play');

  useEffect(
    () => () => {
      clearTimeout(nextMomentTimeoutRef.current);
      clearTimeout(videoHandlingTimeoutRef.current);
      clearInterval(intervalRef.current);
    },
    []
  );

  useEffect(() => {
    clearTimeout(videoHandlingTimeoutRef.current);
    clearInterval(intervalRef.current);

    const isForcePlay = preferredVideoState === 1;

    videoHandlingTimeoutRef.current = setTimeout(
      () => {
        videoHandling(false, isForcePlay);
      },
      videoLengthMode === 'Super Short' ? 1500 : 30
    );
  }, [currentMoment]);

  useEffect(() => {
    (currentMoment.manualClick || currentCard.manualClick) && clearTimeout(nextMomentTimeoutRef.current);
  }, [currentMoment, currentCard]);

  useEffect(() => {
    modeRef.current = playbackMode;
		
    if (playbackMode === 'pause') {
      clearTimeout(nextMomentTimeoutRef.current);
      return;
    }

    playbackMode === 'play' && toNextMomentOrCard();
    // eslint-disable-next-line
  }, [playbackMode]);

  function toNextMomentOrCard() {
    const momentIndex = currentCard.moments.findIndex(moment => moment.inner.id === currentMoment.inner?.id);

    if (momentIndex < currentCard.moments.length - 1) {
      const nextMoment = currentCard.moments[momentIndex + 1];

      dispatch(setCurrentMoment(nextMoment));

      if (!nextMoment.video || nextMoment?.inner?.id >= preview.camera_info.broadcast_link_add_moment_from)
        return;
    } else {
      let cardIndex = filteredCards.findIndex(
        card => card.moments[0].inner.id === currentCard.moments[0].inner.id
      );

      cardIndex++;

      if (cardIndex < filteredCards.length) {
        dispatch(
          setCurrentCard({
            ...filteredCards[cardIndex],
            toFirstMoment: !isLastMomentMode,
            manualClick: false
          })
        );

        return;
      }
    }
  }

  const videoHandling = (doSeek = true, isForcePlay = true, seekToCurrentTime = false) => {
    clearInterval(intervalRef.current);

    if (
      !currentMoment.video ||
      currentMoment?.inner?.id >= preview.camera_info.broadcast_link_add_moment_from
    ) {
      if (modeRef.current !== 'pause') {
        nextMomentTimeoutRef.current = setTimeout(toNextMomentOrCard, 3000);
      }
      return;
    }

    if (currentCard.moments.length === 0 || !currentCard.moments[0].video) {
      return;
    }
  };
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
