import React, { useEffect, useRef } from 'react';
import cl from './Video.module.scss';
import YouTube from 'react-youtube';
import VideoEventsList from '../VideoEventsList/VideoEventsList';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCard, setCurrentMoment, setPlaybackMode } from 'redux/gameReducer';

const Video = () => {
  const videoRef = useRef(null);
  const endRef = useRef(null);
  const intervalRef = useRef(null);
  const momentRef = useRef(0);
  const modeRef = useRef('play');
  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const situationFilter = useSelector(state => state.game.situationFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current === null) return;
    videoHandling();
    // eslint-disable-next-line
  }, [currentMoment]);

  useEffect(() => {
    modeRef.current = playbackMode;
  }, [playbackMode]);

  useEffect(() => {
    if (situationFilter !== 'All' || !videoRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const currentTime = videoRef.current.getCurrentTime();

      if (currentTime >= endRef.current) {
        momentRef.current += 1;

        if (momentRef.current < currentCard.moments.length) {
          videoRef.current.seekTo(currentCard.moments[momentRef.current].video.seconds_from);
          endRef.current = currentCard.moments[momentRef.current].video.seconds_to;
        } else {
          if (modeRef.current === 'pause') {
            videoHandling();
          } else {
            let index = filteredCards.findIndex(
              card => card.moments[0].inner.id === currentCard.moments[0].inner.id
            );

            index++;

            if (index < filteredCards.length) {
              dispatch(setCurrentCard(filteredCards[index]));
              return;
            }

            dispatch(setPlaybackMode('pause'));
          }
        }
      }
    }, 500);
    // eslint-disable-next-line
  }, [filteredCards]);

  const onReady = e => {
    videoRef.current = e.target;
    videoHandling();
  };

  const videoHandling = () => {
    clearInterval(intervalRef.current);
    // momentRef.current = 0;

    if (currentCard.moments.length === 0 || !currentCard.moments[0].video || !currentMoment.video) {
      videoRef.current.pauseVideo();
      return;
    }

    videoRef.current.getPlayerState() !== 1 && videoRef.current.playVideo();
    videoRef.current.seekTo(currentMoment.video.seconds_from);
    // videoRef.current.seekTo(currentCard.moments[0].video.seconds_from);
    endRef.current = currentMoment.video.seconds_to;
    // endRef.current = currentCard.moments[0].video.seconds_to;

    intervalRef.current = setInterval(() => {
      const currentTime = videoRef.current.getCurrentTime();

      if (currentTime >= endRef.current) {
        // momentRef.current += 1;
        if (modeRef.current === 'pause') {
          videoHandling();
					return
        }
        const momentIndex = currentCard.moments.findIndex(
          moment => moment.inner.id === currentMoment.inner.id
        );
        if (momentIndex < currentCard.moments.length - 1) {
          // if (momentRef.current < currentCard.moments.length) {
          videoRef.current.seekTo(currentCard.moments[momentIndex + 1].video.seconds_from);
					dispatch(setCurrentMoment(currentCard.moments[momentIndex + 1]))
          // videoRef.current.seekTo(currentCard.moments[momentRef.current].video.seconds_from);
          endRef.current = currentCard.moments[momentIndex + 1].video.seconds_to;
          // endRef.current = currentCard.moments[momentRef.current].video.seconds_to;
        } else {
          let cardIndex = filteredCards.findIndex(
            card => card.moments[0].inner.id === currentCard.moments[0].inner.id
          );

          cardIndex++;

          if (cardIndex < filteredCards.length) {
            dispatch(setCurrentCard({...filteredCards[cardIndex], manualMoment: true}));
            return;
          }

          dispatch(setPlaybackMode('pause'));
        }
      }
    }, 500);
  };

  return (
    <div className={cl.videoWrapper + ' ' + cl.videoOne}>
      {Object.keys(currentCard).length !== 0 ? (
        <YouTube
          videoId={'WCjLd7QAJq8'}
          onReady={onReady}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              disablekb: 1
              // loop: 1,
              // playlist: '-GR52czEd-0'
            }
          }}
        />
      ) : (
        <></>
      )}
      <VideoEventsList />
    </div>
  );
};

export default Video;
