import React, { useRef, useEffect } from 'react';
import getYouTubeID from 'get-youtube-id';
import PitchVideo from './PitchVideo';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentCard,
  setCurrentMoment,
  setPlaybackMode,
  setSeekValue,
  setVideoCurrentTime,
  setVideoPlaybackRate,
  setVideoState
} from 'redux/gameReducer';

const PitchVideos = () => {
  const { camera_info: cameraInfo } = useSelector(state => state.game.preview);
  const videoState = useSelector(state => state.game.videoState);
  const preferredVideoState = useSelector(state => state.game.preferredVideoState);
  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const currentCard = useSelector(state => state.game.currentCard);
  const sliderCoords = useSelector(state => state.game.timelineSliderCoords);
  const videoLengthMode = useSelector(state => state.game.videoLengthMode);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const isLastMomentMode = useSelector(state => state.game.isLastMomentMode);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const seekValue = useSelector(state => state.game.seekValue);
  const videoPlaybackRate = useSelector(state => state.game.videoPlaybackRate);

  const dispatch = useDispatch();

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);

  const timeIntervalRef = useRef(null);
  const intervalRef = useRef(null);
  const modeRef = useRef('play');
  const endRef = useRef(null);
  const nextMomentTimeoutRef = useRef();
  const videoHandlingTimeoutRef = useRef();

  const VIDEO_REFS = {
    'top-left': video1Ref,
    'top-right': video2Ref,
    bottom: video3Ref
  };

  useEffect(() => {
    const isAllReady = !Object.values(VIDEO_REFS).some(value => value.current === null);

    if (!isAllReady) return;

    clearTimeout(videoHandlingTimeoutRef.current);
    clearInterval(intervalRef.current);

    const isForcePlay = preferredVideoState === 1;

    video1Ref.current.pauseVideo();
    video2Ref.current.pauseVideo();
    video3Ref.current.pauseVideo();

    const { video } = currentMoment;

    if (video) {
      const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');
      // Old method
      // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

      const secondsTotal =
        video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];

      const secondsFromRated =
        video[`${videoLengthPrefix}_seconds_from`] +
        (secondsTotal / 100) * (sliderCoords.changedCoord !== 'x2' ? sliderCoords.x1 : sliderCoords.x2);

      Object.values(VIDEO_REFS).forEach(value => value.current?.seekTo(secondsFromRated));
    }

    videoHandlingTimeoutRef.current = setTimeout(
      () => {
        videoHandling(false, isForcePlay);
      },
      videoLengthMode === 'Super Short' ? 1500 : 30
    );

    // setTimeout(() => {
    //   videoHandling(false);
    // }, 1000);
    // eslint-disable-next-line
  }, [currentMoment, sliderCoords]);

  // useEffect(() => {
  //   const isAllReady = !Object.values(VIDEO_REFS).some(value => value.current === null);

  //   if (!isAllReady) return;

  //   video1Ref.current.pauseVideo();
  //   video2Ref.current.pauseVideo();
  //   video3Ref.current.pauseVideo();

  //   setTimeout(() => {
  //     video1Ref.current.playVideo();
  //     video2Ref.current.playVideo();
  //     video3Ref.current.playVideo();
  //   }, 2000);

  //   // eslint-disable-next-line
  // }, [currentMoment]);

  useEffect(() => {
    const isAllReady = !Object.values(VIDEO_REFS).some(value => value.current === null);

    if (!isAllReady) return;

    playbackMode === 'play' && clearTimeout(nextMomentTimeoutRef.current);

    videoHandling(false);
    // eslint-disable-next-line
  }, [isLastMomentMode]);

  useEffect(() => {
    (currentMoment.manualClick || currentCard.manualClick) && clearTimeout(nextMomentTimeoutRef.current);
  }, [currentMoment, currentCard]);

  useEffect(() => {
    modeRef.current = playbackMode;

    if (currentMoment.video) return;

    if (playbackMode === 'pause') {
      clearTimeout(nextMomentTimeoutRef.current);
      return;
    }

    playbackMode === 'play' && toNextMomentOrCard();
    // eslint-disable-next-line
  }, [playbackMode]);

  useEffect(() => {
    if (seekValue === null) return;

    seekVideos(seekValue);
    dispatch(setSeekValue(null));
    // eslint-disable-next-line
  }, [seekValue]);

  useEffect(() => {
    const isAllReady = !Object.values(VIDEO_REFS).some(value => value.current === null);
    if (!isAllReady) return;

    rateChangeHandler(videoPlaybackRate);
  }, [videoPlaybackRate]);

  // useEffect(() => {
  //   const isAllReady = !Object.values(VIDEO_REFS).some(value => value.current === null);
  //   if (!isAllReady) return;

  //   if (videoState === 1) {
  //     video1Ref.current.playVideo();
  //   }

  //   if (videoState === 2) {
  //     video1Ref.current.pauseVideo();
  //   }
  // }, [videoState]);

  useEffect(() => {
    clearInterval(timeIntervalRef.current);

    timeIntervalRef.current = setInterval(
      () => {
        const time = VIDEO_REFS['top-left'].current?.getCurrentTime();
        time && dispatch(setVideoCurrentTime(time));
        // (videoState === 1 || videoState === null) && time && dispatch(setVideoCurrentTime(time));
      },
      videoState === 1 ? 15 : 200
    );

    return () => {
      clearInterval(timeIntervalRef.current);
    };
    // eslint-disable-next-line
  }, [currentMoment, videoState]);

  const { left_main_link: topLeftLink, right_main_link: topRightLink, pitch_link: bottomLink } = cameraInfo;

  const videoId1 = getYouTubeID(topLeftLink) || 'WCjLd7QAJq8';
  const videoId2 = getYouTubeID(topRightLink) || null;
  const videoId3 = getYouTubeID(bottomLink) || null;
  // const videoId1 = 'ZTsgKIKW8GE' || getYouTubeID(topLeftLink) || 'WCjLd7QAJq8';
  // const videoId2 = 'ZTsgKIKW8GE' || getYouTubeID(topRightLink) || null;
  // const videoId3 = 'ZTsgKIKW8GE' || getYouTubeID(bottomLink) || null;

  function toNextMomentOrCard() {
    const momentIndex = currentCard.moments.findIndex(moment => moment.inner.id === currentMoment.inner?.id);

    if (momentIndex < currentCard.moments.length - 1) {
      const nextMoment = currentCard.moments[momentIndex + 1];

      dispatch(setCurrentMoment(nextMoment));

      if (!nextMoment.video) return;

      const { video: nextVideo } = nextMoment;
      const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');
      // Old method
      // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

      //
      const getSliderCoords = video => {
				// Old super short calc method
        // const totalSeconds = video.short_seconds_to - video.short_seconds_from;

        // const startSecondsDelta = video.super_short_seconds_from - video.short_seconds_from;
        // const startSecondsPercent = (startSecondsDelta * 100) / totalSeconds;

        // const endSecondsDelta = video.super_short_seconds_to - video.short_seconds_from;
        // const endSecondsPercent = (endSecondsDelta * 100) / totalSeconds;

        return {
          x1: 0,
          x2: 0
          // x1: videoLengthMode === 'Super Short' ? startSecondsPercent : 0,
          // x2: videoLengthMode === 'Super Short' ? endSecondsPercent : 0
        };
      };
      //

      const secondsTotal =
        nextVideo[`${videoLengthPrefix}_seconds_to`] - nextVideo[`${videoLengthPrefix}_seconds_from`];

      const secondsFromRated =
        nextVideo[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * getSliderCoords(nextVideo).x1;

      Object.values(VIDEO_REFS).forEach(value => value.current.seekTo(secondsFromRated));

      const secondsToRated =
        nextVideo[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * getSliderCoords(nextVideo).x2;
      endRef.current = secondsToRated;
    } else {
      let cardIndex = filteredCards.findIndex(
        card => card.moments[0].inner.id === currentCard.moments[0].inner.id
      );

      cardIndex++;

      if (cardIndex < filteredCards.length) {
        console.log(isLastMomentMode);
        dispatch(
          setCurrentCard({
            ...filteredCards[cardIndex],
            toFirstMoment: !isLastMomentMode,
            manualClick: false
          })
        );
        // dispatch(setCurrentCard({ ...filteredCards[cardIndex], manualMoment: !isLastMomentMode }));
        return;
      }
      console.log('%cSet', 'color: red');
      dispatch(setPlaybackMode('pause'));
    }
  }

  const videoHandling = (doSeek = true, isForcePlay = true, seekToCurrentTime = false) => {
    clearInterval(intervalRef.current);

    if (!currentMoment.video) {
      Object.values(VIDEO_REFS).forEach(value => value.current?.pauseVideo());

      if (modeRef.current !== 'pause') {
        nextMomentTimeoutRef.current = setTimeout(toNextMomentOrCard, 3000);
      }
      return;
    }

    if (currentCard.moments.length === 0 || !currentCard.moments[0].video) {
      Object.values(VIDEO_REFS).forEach(value => value.current.pauseVideo());

      return;
    }

    const { video } = currentMoment;
    const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');
    // Old method
    // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

    const secondsTotal =
      video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];

    const secondsFromRated =
      video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x1;

    const seekToTime = seekToCurrentTime ? videoCurrentTime : secondsFromRated;

    doSeek && Object.values(VIDEO_REFS).forEach(value => value.current?.seekTo(seekToTime));

    isForcePlay &&
      Object.values(VIDEO_REFS).forEach(value => {
        // console.log(value.current?.getPlayerState());
        // value.current?.getPlayerState() !== 1 &&
        value.current?.playVideo();
      });

    const secondsToRated =
      video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x2;

    endRef.current = secondsToRated;

    intervalRef.current = setInterval(() => {
      if (Object.values(VIDEO_REFS).some(value => !value.current)) return;

      const currentTime = VIDEO_REFS['top-left'].current.getCurrentTime();

      if (currentTime >= endRef.current) {
        if (modeRef.current === 'pause') {
          videoHandling(true, isForcePlay);
          return;
        }

        //To next moment or card
        toNextMomentOrCard();
      }
    }, 50);
  };

  function rateChangeHandler(e) {
    const value = typeof e === 'number' ? e : e.data;

    VIDEO_REFS['top-left'].current.setPlaybackRate(value);
    VIDEO_REFS['top-right'].current.setPlaybackRate(value);
    VIDEO_REFS['bottom'].current.setPlaybackRate(value);
  }

  const seekVideos = sec => {
    Object.values(VIDEO_REFS).forEach(value => value.current.seekTo(sec));
  };

  function setPlayPause(state) {
    if (state === 'play') {
      video1Ref.current && video1Ref.current.playVideo();
      video2Ref.current && video2Ref.current.playVideo();
      video3Ref.current && video3Ref.current.playVideo();

      return;
    }

    video1Ref.current && video1Ref.current.pauseVideo();
    video2Ref.current && video2Ref.current.pauseVideo();
    video3Ref.current && video3Ref.current.pauseVideo();
  }

  //Handle on funcs

  const handleOnReady = (position, target) => {
    VIDEO_REFS[position].current = target;

    const isForcePlay = preferredVideoState === 1;
    const seekToCurrentTime = videoCurrentTime > 0;

    videoHandling(true, isForcePlay, seekToCurrentTime);
    // position === 'top-left' && videoHandling();
    position === 'top-left' && dispatch(setVideoPlaybackRate(target.getPlaybackRate()));

    // const isAllReady = !Object.values(VIDEO_REFS).some(value => value.current === null);

    // target.setPlaybackRate(videoPlaybackRate);
    // // target.seekTo(videoCurrentTime);

    // if (!isAllReady || videoState === 2) {
    //   // target.pauseVideo();
    //   return;
    // }

    // if (videoState === null && isAllReady) {
    //   const { video } = currentMoment;
    //   const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

    //   const secondsTotal =
    //     video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];
    //   const secondsFromRated =
    //     video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x1;

    //   dispatch(setVideoCurrentTime(secondsFromRated));

    //   dispatch(setVideoState(1));

    //   // videoHandling();
    //   return;
    // }

    // if (videoState === 1) {
    //   Object.entries(VIDEO_REFS).forEach(entry => entry[0] !== position && entry[1].current.playVideo());
    //   videoHandling();
    // }
  };

  const stateChangeHandler = (position, target, stateValue) => {
    // console.log('position:', position, 'stateValue:', stateValue);

    position === 'top-left' && dispatch(setVideoState(stateValue));

    const isAllReady = !Object.entries(VIDEO_REFS).some(entry => {
      const entryState = entry[1].current?.getPlayerState();
      return (entryState === 3 || entryState === -1) && position !== entry[0];
    });

    const isAllPaused = Object.entries(VIDEO_REFS).every(entry => {
      const entryState = entry[1].current?.getPlayerState();
      return entryState === 2 || entryState === 3 || position !== entry[0];
    });

    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    const video3 = video3Ref.current;

    if (stateValue === 1) {
      !isAllReady && target.pauseVideo();

      if (isAllReady) {
        if (preferredVideoState === 2) {
          video1.pauseVideo();
          video2.pauseVideo();
          video3.pauseVideo();
          return;
        }

        video1 && preferredVideoState === 1 && video1.playVideo();
        video2 && preferredVideoState === 1 && video2.playVideo();
        video3 && preferredVideoState === 1 && video3.playVideo();
      }
    }

    if (stateValue === 2) {
      video1 && video1.getPlayerState() === 1 && video1.pauseVideo();
      video2 && video2.getPlayerState() === 1 && video2.pauseVideo();
      video3 && video3.getPlayerState() === 1 && video3.pauseVideo();
    }

    if (stateValue === 3 && isAllPaused) {
      video1 && preferredVideoState === 1 && video1.playVideo();
      video2 && preferredVideoState === 1 && video2.playVideo();
      video3 && preferredVideoState === 1 && video3.playVideo();
    }

    // if (value === 1 && videoState === null) {
    //   target.pauseVideo();
    //   return;
    // }

    // const isOtherBuffered = Object.entries(VIDEO_REFS).every(entry => {
    //   const state = entry[1].current?.getPlayerState();
    //   return state === 1 || state === 2 || entry[0] === position;
    // });

    // position === 'top-left' && dispatch(setVideoState(value));

    // if (value === 1) {
    //   if (!isOtherBuffered || videoState === 2) {
    //     target.pauseVideo();

    //     const anyPausedVideo = Object.entries(VIDEO_REFS).find(
    //       entry => entry[1].current.getPlayerState() === 2 && entry[0] !== position
    //     );
    //     // console.log(anyPausedVideo, anyPausedVideo?.current.getCurrentTime());
    //     if (anyPausedVideo) {
    //       console.log('seeked');
    //       target.seekTo(anyPausedVideo[1].current.getCurrentTime());
    //       console.log([
    //         VIDEO_REFS['top-left'].current.getCurrentTime(),
    //         VIDEO_REFS['top-right'].current.getCurrentTime(),
    //         VIDEO_REFS['bottom'].current.getCurrentTime()
    //       ]);
    //     }
    //     return;
    //   }

    //   target.pauseVideo();
    //   const anyPausedVideo = Object.entries(VIDEO_REFS).find(
    //     entry => entry[1].current.getPlayerState() === 2 && entry[0] !== position
    //   );
    //   // console.log(anyPausedVideo, anyPausedVideo?.current.getCurrentTime());
    //   if (anyPausedVideo) {
    //     console.log('seeked');
    //     target.seekTo(anyPausedVideo[1].current.getCurrentTime());
    //     console.log([
    //       VIDEO_REFS['top-left'].current.getCurrentTime(),
    //       VIDEO_REFS['top-right'].current.getCurrentTime(),
    //       VIDEO_REFS['bottom'].current.getCurrentTime()
    //     ]);
    //   }
    //   // dispatch(setVideoState(1))

    //   setTimeout(() => {
    //     Object.values(VIDEO_REFS).forEach(
    //       value => value.current.getPlayerState() !== 1 && value.current.playVideo()
    //     );
    //   }, 2000);
    // }

    // console.log('other buffered:', isOtherBuffered);
  };

  return (
    <>
      <PitchVideo
        videoId={videoId1}
        position='top-left'
        handleOnReady={handleOnReady}
        stateChangeHandler={stateChangeHandler}
      />
      <PitchVideo
        videoId={videoId2}
        position='top-right'
        handleOnReady={handleOnReady}
        stateChangeHandler={stateChangeHandler}
      />
      <PitchVideo
        videoId={videoId3}
        position='bottom'
        handleOnReady={handleOnReady}
        stateChangeHandler={stateChangeHandler}
        setPlayPause={setPlayPause}
      />
      {/* <button
        style={{
          position: 'fixed',
          left: '70%',
          bottom: '15%',
          background: 'lightgreen',
          padding: '3px 7px'
        }}
        onClick={() => setPlayPause('play')}>
        Play
      </button>
      <button
        style={{ position: 'fixed', left: '73%', bottom: '15%', background: 'lightpink', padding: '3px 7px' }}
        onClick={() => setPlayPause('pause')}>
        Pause
      </button> */}
    </>
  );
};

export default PitchVideos;
