import React, { useLayoutEffect, useRef, forwardRef, useEffect } from 'react';
import Video from '../Video/Video';
import getYouTubeID from 'get-youtube-id';
import { useDispatch, useSelector } from 'react-redux';
import { setSeekValue, setVideoState } from 'redux/gameReducer';
import VideoControls from '../VideoControls/VideoControls';

const VideoList = ({ viewMode }, ref) => {
  const preview = useSelector(state => state.game.preview);
  const isFullscreen = useSelector(state => state.game.isFullscreen);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const videoPlaybackRate = useSelector(state => state.game.videoPlaybackRate);
  const seekValue = useSelector(state => state.game.seekValue);

  const dispatch = useDispatch();

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

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
  }, [isFullscreen]);

  useEffect(() => {
    if (seekValue === null) return;

    seekVideos(seekValue);
    dispatch(setSeekValue(null));
  }, [seekValue]);

  useEffect(() => {
    rateChangeHandler(videoPlaybackRate);
  }, [videoPlaybackRate]);

  useLayoutEffect(() => {
    video1Ref.current = null;
    video2Ref.current = null;
    video3Ref.current = null;
    video4Ref.current = null;
  }, [viewMode]);

  const { camera_info: cameraInfo, camera_views: cameraViews } = preview;

  const getCamLink = (modeNumber, index) =>
    cameraInfo[JSON.parse(cameraViews[modeNumber - 1]).cameras[index]];

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

  const stateChangeHandler = (e, videoNumber) => {
    videoNumber === 1 && dispatch(setVideoState(e.data));

    const currViewStates = [];
    video1Ref.current && currViewStates.push(video1Ref.current.getPlayerState());
    video2Ref.current && currViewStates.push(video2Ref.current.getPlayerState());
    video3Ref.current && currViewStates.push(video3Ref.current.getPlayerState());
    video4Ref.current && currViewStates.push(video4Ref.current.getPlayerState());

    const isAllReady = !currViewStates.some(
      (state, i) => (state === 3 || state === -1) && i !== videoNumber - 1
    );

    const isAllPaused = currViewStates.every(
      (state, i) => state === 2 || state === 3 || i === videoNumber - 1
    );

    if (e.data === 1) {
      !isAllReady && e.target.pauseVideo();

      if (isAllReady) {
        video1Ref.current && video1Ref.current.playVideo();
        video2Ref.current && video2Ref.current.playVideo();
        video3Ref.current && video3Ref.current.playVideo();
        video4Ref.current && video4Ref.current.playVideo();
      }
    }

    if (e.data === 2) {
      video1Ref.current && video1Ref.current.getPlayerState() === 1 && video1Ref.current.pauseVideo();
      video2Ref.current && video2Ref.current.getPlayerState() === 1 && video2Ref.current.pauseVideo();
      video3Ref.current && video3Ref.current.getPlayerState() === 1 && video3Ref.current.pauseVideo();
      video4Ref.current && video4Ref.current.getPlayerState() === 1 && video4Ref.current.pauseVideo();
    }

    if (e.data === 3 && isAllPaused) {
      video1Ref.current && video1Ref.current.playVideo();
      video2Ref.current && video2Ref.current.playVideo();
      video3Ref.current && video3Ref.current.playVideo();
      video4Ref.current && video4Ref.current.playVideo();
    }
  };

  function rateChangeHandler(e) {
    const value = typeof e === 'number' ? e : e.data;

    video1Ref.current && video1Ref.current.setPlaybackRate(value);
    video2Ref.current && video2Ref.current.setPlaybackRate(value);
    video3Ref.current && video3Ref.current.setPlaybackRate(value);
    video4Ref.current && video4Ref.current.setPlaybackRate(value);
  }

  const seekVideos = seconds => {
    video1Ref.current && video1Ref.current.seekTo(seconds);
    video2Ref.current && video2Ref.current.seekTo(seconds);
    video3Ref.current && video3Ref.current.seekTo(seconds);
    video4Ref.current && video4Ref.current.seekTo(seconds);
  };
  return (
    <>
      {viewModeNumber === 1 && (
        <Video
          videoId={videoId1}
          videoNumber={1}
          stateChangeHandler={stateChangeHandler}
          rateChangeHandler={rateChangeHandler}
          setPlayPause={setPlayPause}
          ref={video1Ref}
        />
      )}
      {viewModeNumber === 2 && (
        <>
          <Video
            videoId={videoId1}
            videoNumber={1}
            stateChangeHandler={stateChangeHandler}
            rateChangeHandler={rateChangeHandler}
            setPlayPause={setPlayPause}
            ref={video1Ref}
          />
          <Video
            videoId={videoId2}
            videoNumber={2}
            stateChangeHandler={stateChangeHandler}
            rateChangeHandler={rateChangeHandler}
            setPlayPause={setPlayPause}
            ref={video2Ref}
          />
          <Video
            videoId={videoId3}
            videoNumber={3}
            stateChangeHandler={stateChangeHandler}
            rateChangeHandler={rateChangeHandler}
            setPlayPause={setPlayPause}
            ref={video3Ref}
          />
          <Video
            videoId={videoId4}
            videoNumber={4}
            stateChangeHandler={stateChangeHandler}
            rateChangeHandler={rateChangeHandler}
            setPlayPause={setPlayPause}
            ref={video4Ref}
          />
        </>
      )}
      {viewModeNumber === 3 && (
        <>
          <Video
            videoId={videoId1}
            videoNumber={1}
            stateChangeHandler={stateChangeHandler}
            rateChangeHandler={rateChangeHandler}
            setPlayPause={setPlayPause}
            ref={video1Ref}
          />
          <Video
            videoId={videoId2}
            videoNumber={2}
            stateChangeHandler={stateChangeHandler}
            rateChangeHandler={rateChangeHandler}
            setPlayPause={setPlayPause}
            ref={video2Ref}
          />
          <Video
            videoId={videoId3}
            videoNumber={3}
            stateChangeHandler={stateChangeHandler}
            rateChangeHandler={rateChangeHandler}
            setPlayPause={setPlayPause}
            ref={video3Ref}
          />
          <Video
            videoId={videoId4}
            videoNumber={4}
            stateChangeHandler={stateChangeHandler}
            rateChangeHandler={rateChangeHandler}
            setPlayPause={setPlayPause}
            ref={video4Ref}
          />
        </>
      )}
      {currentMoment.video && <VideoControls setPlayPause={setPlayPause} ref={ref} />}
    </>
  );
};

export default forwardRef(VideoList);
