import React, { useRef, useEffect } from 'react';
import getYouTubeID from 'get-youtube-id';
import PitchVideo from './PitchVideo';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  setCurrentCard,
  setCurrentMoment,
  setSeekValue,
  setVideoCurrentTime,
  setVideoState
} from 'redux/gameReducer';

const PitchVideos = () => {
  const { camera_info: cameraInfo } = useSelector(state => state.game.preview);

  const videoState = useSelector(s => s.game.videoState);
  const preferredVideoState = useSelector(s => s.game.preferredVideoState);
  const videoCurrentTime = useSelector(s => s.game.videoCurrentTime);
  const currentMoment = useSelector(s => s.game.currentMoment, shallowEqual);
  const currentCard = useSelector(s => s.game.currentCard, shallowEqual);
  const sliderCoords = useSelector(s => s.game.timelineSliderCoords);
  const videoLengthMode = useSelector(s => s.game.videoLengthMode);
  const filteredCards = useSelector(s => s.game.filteredCards, shallowEqual);
  const isLastMomentMode = useSelector(s => s.game.isLastMomentMode);
  const playbackMode = useSelector(s => s.game.playbackMode);
  const seekValue = useSelector(s => s.game.seekValue);
  const videoPlaybackRate = useSelector(s => s.game.videoPlaybackRate);

  const dispatch = useDispatch();

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);

  const timeIntervalRef = useRef(null);
  const intervalRef = useRef(null);
  const modeRef = useRef('play');
  const endRef = useRef(null);
  const nextMomentTimeoutRef = useRef();
  const playTimeoutRef = useRef();
  const alreadySeekingRef = useRef(false);
  const videoHandlingTimeoutRef = useRef();

  // New synchronization method
  const allTimesIntervalRef = useRef();
  const syncTimeoutRef = useRef(false);

  const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');

  const SECONDS_SRC = currentMoment.video
    ? {
        pitch: {
          timeStart:
            currentMoment.metering?.pitch?.time_start_pitch_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd:
            currentMoment.metering?.pitch?.time_end_pitch_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_to`]
        }
      }
    : {};

  const VIDEO_REFS = {
    'top-left': video1Ref,
    'top-right': video2Ref,
    bottom: video3Ref
  };

  useEffect(() => {
    clearInterval(allTimesIntervalRef.current);

    if (preferredVideoState === 2) {
      clearTimeout(playTimeoutRef.current);
      syncTimeoutRef.current = false;
      alreadySeekingRef.current = false;
    }

    allTimesIntervalRef.current = setInterval(() => {
      const video1Time = video1Ref.current?.getCurrentTime();
      const video2Time = video2Ref.current?.getCurrentTime();
      const video3Time = video3Ref.current?.getCurrentTime();

      if (!video1Time || !video2Time || !video3Time) return;

      const delta1 = 0;
      const delta2 = Math.abs(video1Time - video2Time);
      const delta3 = Math.abs(video1Time - video3Time);

      const deltaArr = [delta1, delta2, delta3];

      const deltaCap = 0.08;
      const deltaCaps = [getCamDelta(1), getCamDelta(2), getCamDelta(3)];
      const isBigDelta = deltaArr.some(
        (delta, i) =>
          delta > Math.abs(deltaCaps[0] - deltaCaps[i]) + deltaCap ||
          delta < Math.abs(deltaCaps[0] - deltaCaps[i]) - deltaCap
      );
      // const isBigDelta = deltaArr.some(delta => delta > deltaCap);

      if (isBigDelta && !alreadySeekingRef.current) {
        video1Ref.current.pauseVideo();
        video2Ref.current?.pauseVideo();
        video3Ref.current?.pauseVideo();
        // delta1 > deltaCaps[1] + deltaCap && video2Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[1]), true);
        (delta2 > Math.abs(deltaCaps[0] - deltaCaps[1]) + deltaCap ||
          delta2 < Math.abs(deltaCaps[0] - deltaCaps[1]) - deltaCap) &&
          video2Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[1]), true);
        (delta3 > Math.abs(deltaCaps[0] - deltaCaps[2]) + deltaCap ||
          delta3 < Math.abs(deltaCaps[0] - deltaCaps[2]) - deltaCap) &&
          video3Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[2]), true);

        // alreadySeekingRef.current = true
      }

      const isAllPaused = Object.entries(VIDEO_REFS).every(entry => {
        const entryState = entry[1].current?.getPlayerState();
        return entryState === 2;
      });

      const isAllReady = Object.entries(VIDEO_REFS).every(entry => {
        const entryState = entry[1].current?.getPlayerState();
        return entryState === -1 || entryState === 2;
      });

      if (isAllReady && !isBigDelta && preferredVideoState === 1 && !syncTimeoutRef.current) {
        syncTimeoutRef.current = true;

        // playTimeoutRef.current = setTimeout(() => {
        video1Ref.current.playVideo();
        video2Ref.current?.playVideo();
        video3Ref.current?.playVideo();

        syncTimeoutRef.current = false;
        alreadySeekingRef.current = false;
        // }, 20);
      }
    }, 90);

    return () => {
      clearInterval(allTimesIntervalRef.current);
      clearTimeout(playTimeoutRef.current);
    };
  }, [preferredVideoState]);

  useEffect(() => {
    const isAllReady = !Object.values(VIDEO_REFS).some(value => value.current === null);

    if (!isAllReady) return;

    clearTimeout(videoHandlingTimeoutRef.current);
    clearInterval(intervalRef.current);

    const isForcePlay = preferredVideoState === 1;

    video1Ref.current?.pauseVideo();
    video2Ref.current?.pauseVideo();
    video3Ref.current?.pauseVideo();

    const { video } = currentMoment;

    if (video) {
      // Old method
      // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

      const secondsTotal = SECONDS_SRC.pitch.timeEnd - SECONDS_SRC.pitch.timeStart;
      // const secondsTotal =
      //   video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];

      const secondsFromRated =
        SECONDS_SRC.pitch.timeStart +
        (secondsTotal / 100) * (sliderCoords.changedCoord !== 'x2' ? sliderCoords.x1 : sliderCoords.x2);
      // const secondsFromRated =
      //   video[`${videoLengthPrefix}_seconds_from`] +
      //   (secondsTotal / 100) * (sliderCoords.changedCoord !== 'x2' ? sliderCoords.x1 : sliderCoords.x2);

      Object.values(VIDEO_REFS).forEach((value, i) =>
        value.current?.seekTo(secondsFromRated - getCamDelta(i + 1), true)
      );
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
    // eslint-disable-next-line
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

    const camDelta1 = getCamDelta(1);

    timeIntervalRef.current = setInterval(
      () => {
        const time = VIDEO_REFS['top-left'].current?.getCurrentTime();
        time && dispatch(setVideoCurrentTime(time + camDelta1));
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

  function getCamDelta(videoNumber) {
    const titles = {
      1: 'left_main_time',
      2: 'right_main_time',
      3: 'pitch_time'
    };

    return cameraInfo[titles[videoNumber]];
  }

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

      const NEXT_SECONDS_SRC = {
        pitch: {
          timeStart:
            nextMoment.metering?.pitch?.time_start_pitch_window ||
            nextMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd:
            nextMoment.metering?.pitch?.time_end_pitch_window ||
            nextMoment.video[`${videoLengthPrefix}_seconds_to`]
        }
      };

      const secondsTotal = NEXT_SECONDS_SRC.pitch.timeEnd - NEXT_SECONDS_SRC.pitch.timeStart;
      // const secondsTotal =
      //   nextVideo[`${videoLengthPrefix}_seconds_to`] - nextVideo[`${videoLengthPrefix}_seconds_from`];

      const secondsFromRated =
        NEXT_SECONDS_SRC.pitch.timeStart + (secondsTotal / 100) * getSliderCoords(nextVideo).x1;
      // const secondsFromRated =
      //   nextVideo[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * getSliderCoords(nextVideo).x1;

      Object.values(VIDEO_REFS).forEach((value, i) =>
        value.current.seekTo(secondsFromRated - getCamDelta(i + 1), true)
      );

      const secondsToRated =
        NEXT_SECONDS_SRC.pitch.timeStart + (secondsTotal / 100) * getSliderCoords(nextVideo).x2;
      // const secondsToRated =
      //   nextVideo[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * getSliderCoords(nextVideo).x2;

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

      // dispatch(setPlaybackMode('pause'));
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
    // const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');
    // Old method
    // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

    const secondsTotal = SECONDS_SRC.pitch.timeEnd - SECONDS_SRC.pitch.timeStart;
    const secondsFromRated = SECONDS_SRC.pitch.timeStart + (secondsTotal / 100) * sliderCoords.x1;
    // const secondsTotal =
    //   video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];

    // const secondsFromRated =
    //   video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x1;

    const seekToTime = seekToCurrentTime ? videoCurrentTime : secondsFromRated;

    doSeek &&
      Object.values(VIDEO_REFS).forEach((value, i) =>
        value.current?.seekTo(seekToTime - getCamDelta(i + 1), true)
      );

    isForcePlay &&
      Object.values(VIDEO_REFS).forEach(value => {
        // console.log(value.current?.getPlayerState());
        // value.current?.getPlayerState() !== 1 &&
        value.current?.playVideo();
      });

    const secondsToRated = SECONDS_SRC.pitch.timeStart + (secondsTotal / 100) * sliderCoords.x2;
    // const secondsToRated =
    //   video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x2;

    endRef.current = secondsToRated;

    const camDelta1 = getCamDelta(1);

    intervalRef.current = setInterval(() => {
      if (Object.values(VIDEO_REFS).some(value => !value.current)) return;

      const currentTime = VIDEO_REFS['top-left'].current.getCurrentTime() + camDelta1;

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

    VIDEO_REFS['top-left'].current?.setPlaybackRate(value);
    VIDEO_REFS['top-right'].current?.setPlaybackRate(value);
    VIDEO_REFS['bottom'].current?.setPlaybackRate(value);
  }

  const seekVideos = sec => {
    Object.values(VIDEO_REFS).forEach((value, i) => {
      value.current.seekTo(sec - getCamDelta(i + 1), true);
    });
  };

  function setPlayPause(state) {
    if (state === 'play') {
      video1Ref.current?.playVideo();
      video2Ref.current?.playVideo();
      video3Ref.current?.playVideo();

      return;
    }

    video1Ref.current?.pauseVideo();
    video2Ref.current?.pauseVideo();
    video3Ref.current?.pauseVideo();
  }

  //Handle on funcs
  const handleOnReady = (position, target) => {
    VIDEO_REFS[position].current = target;

    const isForcePlay = preferredVideoState === 1;
    // const seekToCurrentTime = videoCurrentTime > 0;

    // const isAllReady = !Object.values(VIDEO_REFS).some(value => value.current === null);

    // if (isAllReady && video1Ref.current.getCurrentTime() < )

    const timeStartPitch = currentMoment?.metering?.pitch?.time_start_pitch_window;
    const timeEndPitch = currentMoment?.metering?.pitch?.time_end_pitch_window;
    const seekToCurrentTime =
      videoCurrentTime > 0 && videoCurrentTime > timeStartPitch && videoCurrentTime < timeEndPitch;

    videoHandling(true, isForcePlay, seekToCurrentTime);
    // videoHandling(true, isForcePlay, seekToCurrentTime);
    // position === 'top-left' && videoHandling();
    target.setPlaybackRate(videoPlaybackRate);
    // position === 'top-left' && dispatch(setVideoPlaybackRate(target.getPlaybackRate()));

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

    stateValue === 1 && preferredVideoState === 2 && target.pauseVideo();

    // const isAllReady = !Object.entries(VIDEO_REFS).some(entry => {
    //   const entryState = entry[1].current?.getPlayerState();
    //   return (entryState === 3 || entryState === -1) && position !== entry[0];
    // });

    // const isAllPaused = Object.entries(VIDEO_REFS).every(entry => {
    //   const entryState = entry[1].current?.getPlayerState();
    //   return entryState === 2 || entryState === 3 || position !== entry[0];
    // });

    // const video1 = video1Ref.current;
    // const video2 = video2Ref.current;
    // const video3 = video3Ref.current;

    // if (stateValue === 1) {
    //   !isAllReady && target.pauseVideo();

    //   if (isAllReady) {
    //     if (preferredVideoState === 2) {
    //       video1.pauseVideo();
    //       video2.pauseVideo();
    //       video3.pauseVideo();
    //       return;
    //     }

    //     video1 && preferredVideoState === 1 && video1.playVideo();
    //     video2 && preferredVideoState === 1 && video2.playVideo();
    //     video3 && preferredVideoState === 1 && video3.playVideo();
    //   }
    // }

    // if (stateValue === 2) {
    //   video1 && video1.getPlayerState() === 1 && video1.pauseVideo();
    //   video2 && video2.getPlayerState() === 1 && video2.pauseVideo();
    //   video3 && video3.getPlayerState() === 1 && video3.pauseVideo();
    // }

    // if (stateValue === 3 && isAllPaused) {
    //   video1 && preferredVideoState === 1 && video1.playVideo();
    //   video2 && preferredVideoState === 1 && video2.playVideo();
    //   video3 && preferredVideoState === 1 && video3.playVideo();
    // }

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
    </>

    // {/* <button
    //   style={{
    //     position: 'fixed',
    //     left: '70%',
    //     bottom: '15%',
    //     background: 'lightgreen',
    //     padding: '3px 7px'
    //   }}
    //   onClick={() => setPlayPause('play')}>
    //   Play
    // </button>
    // <button
    //   style={{ position: 'fixed', left: '73%', bottom: '15%', background: 'lightpink', padding: '3px 7px' }}
    //   onClick={() => setPlayPause('pause')}>
    //   Pause
    // </button> */}
  );
};

export default PitchVideos;
