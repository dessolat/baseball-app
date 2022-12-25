import React, { useLayoutEffect, useRef, forwardRef, useEffect } from 'react';
import Video from '../Video/Video';
import getYouTubeID from 'get-youtube-id';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentCard,
  setCurrentMoment,
  setPlaybackMode,
  setSeekValue,
  setVideoCurrentTime,
  setVideoPlaybackRate,
  setVideoState
} from 'redux/gameReducer';
import VideoControls from '../VideoControls/VideoControls';

const VideoList = ({ viewMode }, ref) => {
  const preview = useSelector(state => state.game.preview);
  const isFullscreen = useSelector(state => state.game.isFullscreen);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const currentCard = useSelector(state => state.game.currentCard);
  const videoState = useSelector(state => state.game.videoState);
  const preferredVideoState = useSelector(state => state.game.preferredVideoState);
  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);
  const videoPlaybackRate = useSelector(state => state.game.videoPlaybackRate);
  const seekValue = useSelector(state => state.game.seekValue);
  const sliderCoords = useSelector(state => state.game.timelineSliderCoords);
  const videoLengthMode = useSelector(state => state.game.videoLengthMode);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const isLastMomentMode = useSelector(state => state.game.isLastMomentMode);
  const playbackMode = useSelector(state => state.game.playbackMode);

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

  // New synchronization method
  const allTimesIntervalRef = useRef();
  const syncTimeoutRef = useRef(false);

  const modeNumber = +viewMode.slice(-1);

  const VIDEO_NUMBERS =
    viewMode.slice(-1) === '1'
      ? { 1: video1Ref }
      : {
          1: video1Ref,
          2: video2Ref,
          3: video3Ref,
          4: video4Ref
        };

  useEffect(() => {
		function handleKeyDown(e) {
			if (e.code !== 'Space' || video1Ref.current === null || !currentMoment.video) return;
			e.preventDefault();
	
			const currentState = video1Ref.current.getPlayerState();

			e.code === 'Space' && setPlayPause(currentState === 1 ? 'pause' : 'play');
		}

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [currentMoment]);

  useEffect(() => {
    clearInterval(allTimesIntervalRef.current);

    if (preferredVideoState === 2) {
      clearTimeout(playTimeoutRef.current);
      syncTimeoutRef.current = false;
      alreadySeekingRef.current = false;
    }

    if (viewMode === 'mode-1') return;

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
      console.log(deltaArr);
      const deltaCap = 0.08;
      const deltaCaps = [
        getCamDelta(modeNumber, 1),
        getCamDelta(modeNumber, 2),
        getCamDelta(modeNumber, 3),
        getCamDelta(modeNumber, 4)
      ];
      const isBigDelta = deltaArr.some(
        (delta, i) => delta > Math.abs(deltaCaps[0] - deltaCaps[i]) + deltaCap
      );
      console.log(isBigDelta);
      // const isBigDelta = deltaArr.some(delta => delta > deltaCap);

      if (isBigDelta && !alreadySeekingRef.current) {
        video1Ref.current.pauseVideo();
        video2Ref.current?.pauseVideo();
        video3Ref.current?.pauseVideo();
        video4Ref.current?.pauseVideo();
        // delta1 > deltaCaps[1] + deltaCap && video2Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[1]), true);
        delta2 > deltaCaps[1] + deltaCap &&
          video2Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[1]), true);
        delta3 > deltaCaps[2] + deltaCap &&
          video3Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[2]), true);
        delta4 > deltaCaps[3] + deltaCap &&
          video4Ref.current?.seekTo(video1Time + (deltaCaps[0] - deltaCaps[3]), true);

        // alreadySeekingRef.current = true
      }

      const isAllPaused = Object.entries(VIDEO_NUMBERS).every(entry => {
        const entryState = entry[1].current?.getPlayerState();
        return entryState === 2;
      });

      const isAllReady = Object.entries(VIDEO_NUMBERS).every(entry => {
        const entryState = entry[1].current?.getPlayerState();
        return entryState === -1 || entryState === 2;
      });

      console.log(
        video1Ref.current?.getPlayerState(),
        video2Ref.current?.getPlayerState(),
        video3Ref.current?.getPlayerState(),
        video4Ref.current?.getPlayerState()
      );

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
  }, [preferredVideoState, viewMode]);

  //

  useLayoutEffect(() => {
    video1Ref.current = null;
    video2Ref.current = null;
    video3Ref.current = null;
    video4Ref.current = null;
  }, [viewMode]);

  useEffect(() => {
    if (video1Ref.current === null) return;

    clearTimeout(videoHandlingTimeoutRef.current);
    clearInterval(intervalRef.current);

    // const isForcePlay = false;
    const isForcePlay = preferredVideoState === 1;

    video1Ref.current?.pauseVideo();
    video2Ref.current?.pauseVideo();
    video3Ref.current?.pauseVideo();
    video4Ref.current?.pauseVideo();

    const { video } = currentMoment;

    if (video) {
      const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');
      // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

      const secondsTotal =
        video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];

      const secondsFromRated =
        video[`${videoLengthPrefix}_seconds_from`] +
        (secondsTotal / 100) * (sliderCoords.changedCoord !== 'x2' ? sliderCoords.x1 : sliderCoords.x2);

      video1Ref.current?.seekTo(secondsFromRated - getCamDelta(modeNumber, 1), true);
      video2Ref.current?.seekTo(secondsFromRated - getCamDelta(modeNumber, 2), true);
      video3Ref.current?.seekTo(secondsFromRated - getCamDelta(modeNumber, 3), true);
      video4Ref.current?.seekTo(secondsFromRated - getCamDelta(modeNumber, 4), true);
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
    if (video1Ref.current === null) return;

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
    rateChangeHandler(videoPlaybackRate);
  }, [videoPlaybackRate]);

  useEffect(() => {
    clearInterval(timeIntervalRef.current);

    timeIntervalRef.current = setInterval(
      () => {
        const time = video1Ref.current?.getCurrentTime();

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

  const { camera_info: cameraInfo, camera_views: cameraViews } = preview;

  

  const getCamLink = (modeNumber, index) =>
    cameraInfo[JSON.parse(cameraViews[modeNumber - 1]).cameras[index]];
  function getCamDelta(modeNumber, videoNumber) {
    return cameraInfo[
      JSON.parse(cameraViews[modeNumber - 1]).cameras[videoNumber - 1].replace('link', 'time')
    ];
  }

  const MODE_LINKS = {
    'mode-1': [getCamLink(1, 0)],
    'mode-2': [getCamLink(2, 0), getCamLink(2, 1), getCamLink(2, 2), getCamLink(2, 3)],
    'mode-3': [getCamLink(3, 0), getCamLink(3, 1), getCamLink(3, 2), getCamLink(3, 3)]
  };

  const videoId1 = getYouTubeID(MODE_LINKS[viewMode][0]) || 'WCjLd7QAJq8';
  const videoId2 = getYouTubeID(MODE_LINKS[viewMode][1]) || null;
  const videoId3 = getYouTubeID(MODE_LINKS[viewMode][2]) || null;
  const videoId4 = getYouTubeID(MODE_LINKS[viewMode][3]) || null;

  const viewModeNumber = +viewMode.slice(-1);

  function toNextMomentOrCard() {
    const momentIndex = currentCard.moments.findIndex(moment => moment.inner.id === currentMoment.inner?.id);

    if (momentIndex < currentCard.moments.length - 1) {
      const nextMoment = currentCard.moments[momentIndex + 1];

      dispatch(setCurrentMoment(nextMoment));

      if (!nextMoment.video) return;

      const { video: nextVideo } = nextMoment;
      const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');
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

      video1Ref.current?.seekTo(secondsFromRated - getCamDelta(modeNumber, 1), true);
      video2Ref.current?.seekTo(secondsFromRated - getCamDelta(modeNumber, 2), true);
      video3Ref.current?.seekTo(secondsFromRated - getCamDelta(modeNumber, 3), true);
      video4Ref.current?.seekTo(secondsFromRated - getCamDelta(modeNumber, 4), true);

      const secondsToRated =
        nextVideo[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * getSliderCoords(nextVideo).x2;
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
      video1Ref.current?.pauseVideo();
      video2Ref.current?.pauseVideo();
      video3Ref.current?.pauseVideo();
      video4Ref.current?.pauseVideo();

      if (modeRef.current !== 'pause') {
        nextMomentTimeoutRef.current = setTimeout(toNextMomentOrCard, 3000);
      }
      return;
    }

    if (currentCard.moments.length === 0 || !currentCard.moments[0].video) {
      video1Ref.current?.pauseVideo();
      video2Ref.current?.pauseVideo();
      video3Ref.current?.pauseVideo();
      video4Ref.current?.pauseVideo();

      return;
    }

    const { video } = currentMoment;
    const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');
    // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

    const secondsTotal =
      video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];

    const secondsFromRated =
      video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x1;

    const seekToTime = seekToCurrentTime ? videoCurrentTime : secondsFromRated;

    if (doSeek) {
      video1Ref.current?.seekTo(seekToTime - getCamDelta(modeNumber, 1), true);
      video2Ref.current?.seekTo(seekToTime - getCamDelta(modeNumber, 2), true);
      video3Ref.current?.seekTo(seekToTime - getCamDelta(modeNumber, 3), true);
      video4Ref.current?.seekTo(seekToTime - getCamDelta(modeNumber, 4), true);
    }

    if (isForcePlay) {
      video1Ref.current?.playVideo();
      video2Ref.current?.playVideo();
      video3Ref.current?.playVideo();
      video4Ref.current?.playVideo();
    }

    const secondsToRated =
      video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x2;

    endRef.current = secondsToRated;

    intervalRef.current = setInterval(() => {
      if (video1Ref.current === null) return;
      // if (Object.values(VIDEO_REFS).some(value => !value.current)) return;

      const currentTime = video1Ref.current.getCurrentTime();

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

    video1Ref.current?.setPlaybackRate(value);
    video2Ref.current?.setPlaybackRate(value);
    video3Ref.current?.setPlaybackRate(value);
    video4Ref.current?.setPlaybackRate(value);
  }

  const seekVideos = sec => {
    // New synchronization method
    // if (viewMode !== 'mode-1') {
    //   video1Ref.current?.pauseVideo();
    //   video2Ref.current?.pauseVideo();
    //   video3Ref.current?.pauseVideo();
    //   video4Ref.current?.pauseVideo();
    // }
    //
    alreadySeekingRef.current = false;
    video1Ref.current?.seekTo(sec - getCamDelta(modeNumber, 1), true);
    video2Ref.current?.seekTo(sec - getCamDelta(modeNumber, 2), true);
    video3Ref.current?.seekTo(sec - getCamDelta(modeNumber, 3), true);
    video4Ref.current?.seekTo(sec - getCamDelta(modeNumber, 4), true);
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

  // const VIDEO_NUMBERS =
  //   viewMode.slice(-1) === '1'
  //     ? { 1: video1Ref }
  //     : {
  //         1: video1Ref,
  //         2: video2Ref,
  //         3: video3Ref,
  //         4: video4Ref
  //       };

  const handleOnReady = (videoNumber, target) => {
    VIDEO_NUMBERS[videoNumber].current = target;

    // const isForcePlay = false;
    const isForcePlay = preferredVideoState === 1;
    const seekToCurrentTime = videoCurrentTime > 0;

    videoHandling(true, isForcePlay, seekToCurrentTime);

    videoNumber === 1 && dispatch(setVideoPlaybackRate(target.getPlaybackRate()));
  };

  const stateChangeHandler = (videoNumber, target, stateValue) => {
    console.log('videoNumber:', videoNumber, 'stateValue:', stateValue);
    videoNumber === 1 && dispatch(setVideoState(stateValue));

    stateValue === 1 && preferredVideoState === 2 && target.pauseVideo();

    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    const video3 = video3Ref.current;
    const video4 = video4Ref.current;

    // console.log(
    //   'states:',
    //   video1.getPlayerState(),
    //   video2?.getPlayerState(),
    //   video3?.getPlayerState(),
    //   video4?.getPlayerState()
    // );

    const isAllReady = !Object.entries(VIDEO_NUMBERS).some(entry => {
      const entryState = entry[1].current?.getPlayerState();
      return (entryState === 3 || entryState === -1) && videoNumber !== entry[0];
    });

    const isAllPaused = Object.entries(VIDEO_NUMBERS).every(entry => {
      const entryState = entry[1].current?.getPlayerState();
      return entryState === 2 && videoNumber !== entry[0];
    });

    console.log('isAllReady:', isAllReady);
    console.log('isAllPaused:', isAllPaused);

    // const isAllReady = !Object.entries(VIDEO_NUMBERS).some(entry => {
    //   const entryState = entry[1].current?.getPlayerState();
    //   return (entryState === 3 || entryState === -1) && videoNumber !== entry[0];
    // });

    // const isAllPaused = Object.entries(VIDEO_NUMBERS).every(entry => {
    //   const entryState = entry[1].current?.getPlayerState();
    //   return entryState === 2 || entryState === 3 || videoNumber !== entry[0];
    // });

    // if (stateValue === 1) {
    //   !isAllReady && target.pauseVideo();

    //   if (isAllReady) {
    //     if (preferredVideoState === 2) {
    //       video1.pauseVideo();
    //       video2?.pauseVideo();
    //       video3?.pauseVideo();
    //       video4?.pauseVideo();
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
  };

  return (
    <>
      {viewModeNumber === 1 && (
        <Video
          videoId={videoId1}
          videoNumber={1}
          handleOnReady={handleOnReady}
          stateChangeHandler={stateChangeHandler}
          setPlayPause={setPlayPause}
        />
      )}
      {viewModeNumber === 2 && (
        <>
          <Video
            videoId={videoId1}
            videoNumber={1}
            handleOnReady={handleOnReady}
            stateChangeHandler={stateChangeHandler}
            setPlayPause={setPlayPause}
          />
          <Video
            videoId={videoId2}
            videoNumber={2}
            handleOnReady={handleOnReady}
            stateChangeHandler={stateChangeHandler}
            setPlayPause={setPlayPause}
          />
          <Video
            videoId={videoId3}
            videoNumber={3}
            handleOnReady={handleOnReady}
            stateChangeHandler={stateChangeHandler}
            setPlayPause={setPlayPause}
          />
          <Video
            videoId={videoId4}
            videoNumber={4}
            handleOnReady={handleOnReady}
            stateChangeHandler={stateChangeHandler}
            setPlayPause={setPlayPause}
          />
        </>
      )}
      {viewModeNumber === 3 && (
        <>
          <Video
            videoId={videoId1}
            videoNumber={1}
            handleOnReady={handleOnReady}
            stateChangeHandler={stateChangeHandler}
            setPlayPause={setPlayPause}
          />
          <Video
            videoId={videoId2}
            videoNumber={2}
            handleOnReady={handleOnReady}
            stateChangeHandler={stateChangeHandler}
            setPlayPause={setPlayPause}
          />
          <Video
            videoId={videoId3}
            videoNumber={3}
            handleOnReady={handleOnReady}
            stateChangeHandler={stateChangeHandler}
            setPlayPause={setPlayPause}
          />
          <Video
            videoId={videoId4}
            videoNumber={4}
            handleOnReady={handleOnReady}
            stateChangeHandler={stateChangeHandler}
            setPlayPause={setPlayPause}
          />
        </>
      )}
      {currentMoment.video && <VideoControls setPlayPause={setPlayPause} ref={ref} />}
    </>
  );
};

export default forwardRef(VideoList);
