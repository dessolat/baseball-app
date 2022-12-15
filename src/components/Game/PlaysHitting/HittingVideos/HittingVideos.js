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

  const VIDEO_REFS = {
    'top-left': video1Ref,
    'top-right': video2Ref,
    'bottom-left': video3Ref,
    'bottom-right': video4Ref
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

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
      const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');

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

    timeIntervalRef.current = setInterval(
      () => {
        const time = VIDEO_REFS['top-left'].current?.getCurrentTime();
        time && dispatch(setVideoCurrentTime(time));
      },
      videoState === 1 ? 15 : 200
    );

    return () => {
      clearInterval(timeIntervalRef.current);
    };
    // eslint-disable-next-line
  }, [currentMoment, videoState]);

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

  const videoId1 = getYouTubeID(topLeftLink) || 'WCjLd7QAJq8';
  const videoId2 = getYouTubeID(topRightLink) || null;
  const videoId3 = getYouTubeID(bottomLeftLink) || null;
  const videoId4 = getYouTubeID(bottomRightLink) || null;

  function toNextMomentOrCard() {
    const momentIndex = currentCard.moments.findIndex(moment => moment.inner.id === currentMoment.inner?.id);

    if (momentIndex < currentCard.moments.length - 1) {
      const nextMoment = currentCard.moments[momentIndex + 1];

      dispatch(setCurrentMoment(nextMoment));

      if (!nextMoment.video) return;

      const { video: nextVideo } = nextMoment;
      const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');

      const getSliderCoords = video => ({
        x1: 0,
        x2: 0
      });

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

    const { video } = currentMoment;
    const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');

    const secondsTotal =
      video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];

    const secondsFromRated =
      video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x1;

    const seekToTime = seekToCurrentTime ? videoCurrentTime : secondsFromRated;

    doSeek && Object.values(VIDEO_REFS).forEach(value => value.current?.seekTo(seekToTime));

    isForcePlay &&
      Object.values(VIDEO_REFS).forEach(value => {
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
    VIDEO_REFS['bottom-left'].current.setPlaybackRate(value);
    VIDEO_REFS['bottom-right'].current.setPlaybackRate(value);
  }

  const seekVideos = sec => {
    Object.values(VIDEO_REFS).forEach(value => value.current.seekTo(sec));
  };

  function setPlayPause(state) {
    if (state === 'play') {
      video1Ref.current && video1Ref.current.playVideo();
      video2Ref.current && video2Ref.current.playVideo();
      video3Ref.current && video3Ref.current.playVideo();
      video4Ref.current && video4Ref.current.playVideo();

      return;
    }

    video1Ref.current && video1Ref.current.pauseVideo();
    video2Ref.current && video2Ref.current.pauseVideo();
    video3Ref.current && video3Ref.current.pauseVideo();
    video4Ref.current && video4Ref.current.pauseVideo();
  }

  //Handle on funcs

  const handleOnReady = (position, target) => {
    VIDEO_REFS[position].current = target;

    const isForcePlay = preferredVideoState === 1;
    const seekToCurrentTime = videoCurrentTime > 0;

    videoHandling(true, isForcePlay, seekToCurrentTime);

    position === 'top-left' && dispatch(setVideoPlaybackRate(target.getPlaybackRate()));
  };

  const stateChangeHandler = (position, target, stateValue) => {
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
    const video4 = video4Ref.current;

    if (stateValue === 1) {
      !isAllReady && target.pauseVideo();

      if (isAllReady) {
        if (preferredVideoState === 2) {
          video1.pauseVideo();
          video2.pauseVideo();
          video3.pauseVideo();
          video4.pauseVideo();
          return;
        }

        video1 && preferredVideoState === 1 && video1.playVideo();
        video2 && preferredVideoState === 1 && video2.playVideo();
        video3 && preferredVideoState === 1 && video3.playVideo();
        video4 && preferredVideoState === 1 && video4.playVideo();
      }
    }

    if (stateValue === 2) {
      video1 && video1.getPlayerState() === 1 && video1.pauseVideo();
      video2 && video2.getPlayerState() === 1 && video2.pauseVideo();
      video3 && video3.getPlayerState() === 1 && video3.pauseVideo();
      video4 && video4.getPlayerState() === 1 && video4.pauseVideo();
    }

    if (stateValue === 3 && isAllPaused) {
      video1 && preferredVideoState === 1 && video1.playVideo();
      video2 && preferredVideoState === 1 && video2.playVideo();
      video3 && preferredVideoState === 1 && video3.playVideo();
      video4 && preferredVideoState === 1 && video4.playVideo();
    }
  };

  function handleMouseMove() {
    if (!currentMoment.video) return;

    clearTimeout(timerRef.current);

    controlsWrapperRef.current.firstChild.style.opacity = 1;
    controlsWrapperRef.current.firstChild.style.visibility = 'visible';

    timerRef.current = setTimeout(() => {
      if (!controlsWrapperRef.current) return;
      controlsWrapperRef.current.firstChild.style.opacity = 0;
      timerRef.current = setTimeout(() => {
        controlsWrapperRef.current.firstChild.style.visibility = 'hidden';
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
      {currentMoment.video && <VideoControls setPlayPause={setPlayPause} fullscreenAvailable={false} ref={controlsWrapperRef} />}
    </div>
  );
};

export default forwardRef(HittingVideos);
