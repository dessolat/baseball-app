import React, { forwardRef, useRef, useEffect } from 'react';
import cl from '../PlaysHitting.module.scss';
// import TopImage from 'images/hit_top_image.jpg';
// import BottomImage from 'images/hit_bottom_image.jpg';
import { useSelector, useDispatch } from 'react-redux';
import VideoControls from 'components/Game/VideoControls/VideoControls';
import getYouTubeID from 'get-youtube-id';
import {
  setCurrentCard,
  setCurrentMoment,
  setPlaybackMode,
  setSeekValue,
  setVideoCurrentTime,
  setVideoPlaybackRate,
  setVideoState
} from 'redux/gameReducer';
import HittingVideo from './HittingVideo';

const HittingVideos = () => {
  const wrapperRef = useRef();
  const timerRef = useRef();
  const controlsWrapperRef = useRef();

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
  const video4Ref = useRef(null);

  const timeIntervalRef = useRef(null);
  const intervalRef = useRef(null);
  const modeRef = useRef('play');
  const endRef = useRef(null);
  const nextMomentTimeoutRef = useRef();
  const videoHandlingTimeoutRef = useRef();
  const playTimeoutRef = useRef();
  const alreadySeekingRef = useRef(false);
  const prevBatterPositionRef = useRef(0);

  // New synchronization method
  const allTimesIntervalRef = useRef();
  const syncTimeoutRef = useRef(false);

  const VIDEO_REFS = {
    'top-left': video1Ref,
    'top-right': video2Ref,
    'bottom-left': video3Ref,
    'bottom-right': video4Ref
  };

  const getVideoNumByPos = {
    'top-left': 1,
    'top-right': 2,
    'bottom-left': 3,
    'bottom-right': 4
  };

  const prevVideoStatesRef = useRef({
    'top-left': -1,
    'top-right': -1,
    'bottom-left': -1,
    'bottom-right': -1
  });

  const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');

  const SECONDS_SRC = currentMoment.video
    ? {
        hitting: {
          timeStart:
            currentMoment.metering?.hit?.time_start_hit_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd:
            currentMoment.metering?.hit?.time_end_hit_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_to`]
        }
      }
    : {};

  useEffect(() => () => clearTimeout(timerRef.current), []);

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
      const video4Time = video4Ref.current?.getCurrentTime();

      if (!video1Time || !video2Time || !video3Time || !video4Time) return;

      const delta1 = 0;
      const delta2 = Math.abs(video1Time - video2Time);
      const delta3 = Math.abs(video1Time - video3Time);
      const delta4 = Math.abs(video1Time - video4Time);

      const deltaArr = [delta1, delta2, delta3, delta4];

      const deltaCap = 0.08;
      const deltaCaps = [getCamDelta(1), getCamDelta(2), getCamDelta(3), getCamDelta(4)];
      const isBigDelta = deltaArr.some(
        (delta, i) =>
          delta > Math.abs(deltaCaps[0] - deltaCaps[i]) + deltaCap ||
          delta < Math.abs(deltaCaps[0] - deltaCaps[i]) - deltaCap
      );

      if (isBigDelta && !alreadySeekingRef.current) {
        video1Ref.current.pauseVideo();
        video2Ref.current?.pauseVideo();
        video3Ref.current?.pauseVideo();
        video4Ref.current?.pauseVideo();
        // delta1 > deltaCaps[1] + deltaCap && video2Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[1]), true);
        (delta2 > Math.abs(deltaCaps[0] - deltaCaps[1]) + deltaCap ||
          delta2 < Math.abs(deltaCaps[0] - deltaCaps[1]) - deltaCap) &&
          video2Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[1]), true);
        (delta3 > Math.abs(deltaCaps[0] - deltaCaps[2]) + deltaCap ||
          delta3 < Math.abs(deltaCaps[0] - deltaCaps[2]) - deltaCap) &&
          video3Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[2]), true);
        (delta4 > Math.abs(deltaCaps[0] - deltaCaps[3]) + deltaCap ||
          delta4 < Math.abs(deltaCaps[0] - deltaCaps[3]) - deltaCap) &&
          video4Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[3]), true);

        // alreadySeekingRef.current = true
      }

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
        video4Ref.current?.playVideo();

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

    video1Ref.current.pauseVideo();
    video2Ref.current.pauseVideo();
    video3Ref.current.pauseVideo();
    video4Ref.current.pauseVideo();

    const { video } = currentMoment;

    if (video) {
      const secondsTotal = SECONDS_SRC.hitting.timeEnd - SECONDS_SRC.hitting.timeStart;
      const secondsFromRated =
        SECONDS_SRC.hitting.timeStart +
        (secondsTotal / 100) * (sliderCoords.changedCoord !== 'x2' ? sliderCoords.x1 : sliderCoords.x2);

      video1Ref.current.seekTo(secondsFromRated - getCamDelta(1), true);
      video2Ref.current.seekTo(secondsFromRated - getCamDelta(2), true);
      video3Ref.current.seekTo(secondsFromRated - getCamDelta(3), true);
      video4Ref.current.seekTo(secondsFromRated - getCamDelta(4), true);

      prevBatterPositionRef.current = currentMoment.metering?.pitch?.batter_position;
      // Object.values(VIDEO_REFS).forEach((value, i) => {
      //   value.current?.seekTo(secondsFromRated - getCamDelta(i + 1), true);
      // });
    }

    videoHandlingTimeoutRef.current = setTimeout(
      () => {
        videoHandling(false, isForcePlay);
      },
      videoLengthMode === 'Super Short' ? 1500 : 30
    );
    // eslint-disable-next-line
  }, [currentMoment, sliderCoords]);

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

  useEffect(() => {
    clearInterval(timeIntervalRef.current);

    const camDelta1 = getCamDelta(1);

    timeIntervalRef.current = setInterval(
      () => {
        // if (VIDEO_REFS['top-left'].current?.getPlayerState === 5) return
        const time = VIDEO_REFS['top-left'].current?.getCurrentTime();
        time && dispatch(setVideoCurrentTime(time + camDelta1));
      },
      videoState === 1 ? 15 : 200
    );

    return () => {
      clearInterval(timeIntervalRef.current);
    };
    // eslint-disable-next-line
  }, [currentMoment, videoState]);

  const { batter_position: batterPosition } = currentMoment.metering?.pitch || {};

  const {
    left_add_link: topLeftLink,
    right_add_link: topRightLink,
    bat_right_link: bottomLeftLink,
    bat_left_link: bottomRightLink
    // left_main_link: topLeftLink,
    // right_main_link: topRightLink,
    // left_main_link: bottomLeftLink,
    // right_main_link: bottomRightLink
  } = cameraInfo;

  function getCamDelta(videoNumber) {
    const titles = {
      1: batterPosition === 0 ? 'left_add_time' : 'right_add_time',
      2: batterPosition === 0 ? 'right_add_time' : 'left_add_time',
      3: batterPosition === 0 ? 'bat_right_time' : 'bat_left_time',
      4: batterPosition === 0 ? 'bat_left_time' : 'bat_right_time'
    };

    return cameraInfo[titles[videoNumber]];
  }

  // const videoId1 = getYouTubeID(topLeftLink) || 'WCjLd7QAJq8';
  // const videoId2 = getYouTubeID(topRightLink) || null;
  // const videoId3 = getYouTubeID(bottomLeftLink) || null;
  // const videoId4 = getYouTubeID(bottomRightLink) || null;
  const videoId1 = getYouTubeID(batterPosition === 0 ? topLeftLink : topRightLink) || 'WCjLd7QAJq8';
  const videoId2 = getYouTubeID(batterPosition === 0 ? topRightLink : topLeftLink) || null;
  const videoId3 = getYouTubeID(batterPosition === 0 ? bottomLeftLink : bottomRightLink) || null;
  const videoId4 = getYouTubeID(batterPosition === 0 ? bottomRightLink : bottomLeftLink) || null;

  function toNextMomentOrCard() {
    const momentIndex = currentCard.moments.findIndex(moment => moment.inner.id === currentMoment.inner?.id);

    if (momentIndex < currentCard.moments.length - 1) {
      const nextMoment = currentCard.moments[momentIndex + 1];

      dispatch(setCurrentMoment(nextMoment));

      if (!nextMoment.video) return;

      const { video: nextVideo } = nextMoment;

      const getSliderCoords = video => ({
        x1: 0,
        x2: 0
      });

      const NEXT_SECONDS_SRC = {
        hitting: {
          timeStart:
            nextMoment.metering?.hit?.time_start_hit_window ||
            nextMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd:
            nextMoment.metering?.hit?.time_end_hit_window ||
            nextMoment.video[`${videoLengthPrefix}_seconds_to`]
        }
      };

      const secondsTotal = NEXT_SECONDS_SRC.hitting.timeEnd - NEXT_SECONDS_SRC.hitting.timeStart;

      const secondsFromRated =
        NEXT_SECONDS_SRC.hitting.timeStart + (secondsTotal / 100) * getSliderCoords(nextVideo).x1;

      Object.values(VIDEO_REFS).forEach((value, i) =>
        value.current.seekTo(secondsFromRated - getCamDelta(i + 1), true)
      );

      const secondsToRated =
        NEXT_SECONDS_SRC.hitting.timeStart + (secondsTotal / 100) * getSliderCoords(nextVideo).x2;
      endRef.current = secondsToRated;
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

    const secondsTotal = SECONDS_SRC.hitting.timeEnd - SECONDS_SRC.hitting.timeStart;

    const secondsFromRated = SECONDS_SRC.hitting.timeStart + (secondsTotal / 100) * sliderCoords.x1;

    const seekToTime = seekToCurrentTime ? videoCurrentTime : secondsFromRated;

    doSeek &&
      Object.values(VIDEO_REFS).forEach((value, i) =>
        value.current?.seekTo(seekToTime - getCamDelta(i + 1), true)
      );

    isForcePlay &&
      Object.values(VIDEO_REFS).forEach(value => {
        value.current?.playVideo();
      });

    const secondsToRated = SECONDS_SRC.hitting.timeStart + (secondsTotal / 100) * sliderCoords.x2;

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
    VIDEO_REFS['bottom-left'].current?.setPlaybackRate(value);
    VIDEO_REFS['bottom-right'].current?.setPlaybackRate(value);
  }

  const seekVideos = sec => {
    Object.values(VIDEO_REFS).forEach((value, i) => value.current.seekTo(sec - getCamDelta(i + 1), true));
  };

  function setPlayPause(state) {
    if (state === 'play') {
      video1Ref.current?.playVideo();
      video2Ref.current?.playVideo();
      video3Ref.current?.playVideo();
      video4Ref.current?.playVideo();

      return;
    }

    video1Ref.current?.pauseVideo();
    video2Ref.current?.pauseVideo();
    video3Ref.current?.pauseVideo();
    video4Ref.current?.pauseVideo();
  }

  //Handle on funcs

  const handleOnReady = (position, target) => {
    VIDEO_REFS[position].current = target;

    const isForcePlay = preferredVideoState === 1;

    const timeStartHit = currentMoment?.metering?.hit?.time_start_hit_window;
    const timeEndHit = currentMoment?.metering?.hit?.time_end_hit_window;
    const seekToCurrentTime =
      videoCurrentTime > 0 && videoCurrentTime > timeStartHit && videoCurrentTime < timeEndHit;
    // const seekToCurrentTime = videoCurrentTime > 0 && !currentMoment.metering.hit;

    videoHandling(true, isForcePlay, seekToCurrentTime);

    target.setPlaybackRate(videoPlaybackRate);
    // position === 'top-left' && dispatch(setVideoPlaybackRate(target.getPlaybackRate()));
  };

  const stateChangeHandler = (position, target, stateValue) => {
    position === 'top-left' && dispatch(setVideoState(stateValue));

    if (prevVideoStatesRef.current[position] === 5 && SECONDS_SRC.hitting?.timeEnd) {
      const secondsTotal = SECONDS_SRC.hitting.timeEnd - SECONDS_SRC.hitting.timeStart;
      const secondsFromRated =
        SECONDS_SRC.hitting.timeStart +
        (secondsTotal / 100) * (sliderCoords.changedCoord !== 'x2' ? sliderCoords.x1 : sliderCoords.x2);

      target.seekTo(secondsFromRated - getCamDelta(getVideoNumByPos[position]), true);
      preferredVideoState === 1 &&
        setTimeout(() => {
          target.playVideo();
        }, 200);
    }

    prevVideoStatesRef.current[position] = stateValue;

    stateValue === 1 && preferredVideoState === 2 && target.pauseVideo();

    // const isAllReady = !Object.entries(VIDEO_REFS).some(entry => {
    //   const entryState = entry[1].current?.getPlayerState();
    //   return (entryState === 3 || entryState === -1) && position !== entry[0];
    // });

    // const isAllPaused = Object.entries(VIDEO_REFS).every(entry => {
    //   const entryState = entry[1].current?.getPlayerState();
    //   return entryState === 2 || entryState === 3 || position !== entry[0];
    // });

    const isAllQued = Object.entries(VIDEO_REFS).every(entry => {
      const entryState = entry[1].current?.getPlayerState();
      return entryState === 5 || position !== entry[0];
    });

    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    const video3 = video3Ref.current;
    const video4 = video4Ref.current;

    // if (stateValue === 1) {
    //   !isAllReady && target.pauseVideo();

    //   if (isAllReady) {
    //     if (preferredVideoState === 2) {
    //       video1.pauseVideo();
    //       video2.pauseVideo();
    //       video3.pauseVideo();
    //       video4.pauseVideo();
    //       return;
    //     }

    //     video1 && preferredVideoState === 1 && video1.playVideo();
    //     video2 && preferredVideoState === 1 && video2.playVideo();
    //     video3 && preferredVideoState === 1 && video3.playVideo();
    //     video4 && preferredVideoState === 1 && video4.playVideo();
    //   }
    // }

    // if (stateValue === 2) {
    //   video1 && video1.getPlayerState() === 1 && video1.pauseVideo();
    //   video2 && video2.getPlayerState() === 1 && video2.pauseVideo();
    //   video3 && video3.getPlayerState() === 1 && video3.pauseVideo();
    //   video4 && video4.getPlayerState() === 1 && video4.pauseVideo();
    // }

    // if (stateValue === 3 && isAllPaused) {
    //   video1 && preferredVideoState === 1 && video1.playVideo();
    //   video2 && preferredVideoState === 1 && video2.playVideo();
    //   video3 && preferredVideoState === 1 && video3.playVideo();
    //   video4 && preferredVideoState === 1 && video4.playVideo();
    // }

    // if (stateValue === 5 && SECONDS_SRC.hitting) {

    // 		const secondsTotal = SECONDS_SRC.hitting.timeEnd - SECONDS_SRC.hitting.timeStart;
    // 		const secondsFromRated =
    // 			SECONDS_SRC.hitting.timeStart +
    // 			(secondsTotal / 100) * (sliderCoords.changedCoord !== 'x2' ? sliderCoords.x1 : sliderCoords.x2);

    // 		target.seekTo(secondsFromRated, true);
    // 		console.log('asdasd');
    // 		setTimeout(() => {target.playVideo()}, 100)
    // }

    if (stateValue === 5 && preferredVideoState === 1) {
      video1?.playVideo();
      video2?.playVideo();
      video3?.playVideo();
      video4?.playVideo();
    }
    // if (stateValue === 5 && isAllQued && preferredVideoState === 1) {
    //   video1?.playVideo();
    //   video2?.playVideo();
    //   video3?.playVideo();
    //   video4?.playVideo();
    // }
  };

  function handleMouseMove() {
    if (!currentMoment.video) return;

    clearTimeout(timerRef.current);

    controlsWrapperRef.current.lastChild.style.opacity = 1;
    controlsWrapperRef.current.lastChild.style.visibility = 'visible';

    timerRef.current = setTimeout(() => {
      if (!controlsWrapperRef.current) return;
      controlsWrapperRef.current.lastChild.style.opacity = 0;
      timerRef.current = setTimeout(() => {
        controlsWrapperRef.current.lastChild.style.visibility = 'hidden';
      }, 300);
    }, 500);
  }

  return (
    <div className={cl.videos} onMouseMove={handleMouseMove} onClick={handleMouseMove} ref={wrapperRef}>
      <HittingVideo
        videoId={videoId1}
        position='top-left'
        handleOnReady={handleOnReady}
        stateChangeHandler={stateChangeHandler}
      />
      <HittingVideo
        videoId={videoId2}
        position='top-right'
        handleOnReady={handleOnReady}
        stateChangeHandler={stateChangeHandler}
      />
      <HittingVideo
        videoId={videoId3}
        position='bottom-left'
        handleOnReady={handleOnReady}
        stateChangeHandler={stateChangeHandler}
      />
      <HittingVideo
        videoId={videoId4}
        position='bottom-right'
        handleOnReady={handleOnReady}
        stateChangeHandler={stateChangeHandler}
      />

      {/* <div>
        <img src={TopImage} alt='hit-image' />
      </div>
      <div>
        <img src={TopImage} alt='hit-image' />
      </div>
      <div>
        <img src={BottomImage} alt='hit-image' />
      </div>
      <div>
        <img src={BottomImage} alt='hit-image' />
      </div> */}
      {currentMoment.video && (
        <VideoControls setPlayPause={setPlayPause} fullscreenAvailable={false} ref={controlsWrapperRef} />
      )}
    </div>
  );
};

export default forwardRef(HittingVideos);
