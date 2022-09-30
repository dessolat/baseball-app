import React, { useLayoutEffect, useRef } from 'react';
import Video from '../Video/Video';
import getYouTubeID from 'get-youtube-id';
import { useSelector } from 'react-redux';

const VideoList = ({ viewMode }) => {
  const preview = useSelector(state => state.game.preview);

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  useLayoutEffect(() => {
    video1Ref.current = null;
    video2Ref.current = null;
    video3Ref.current = null;
    video4Ref.current = null;
  }, [viewMode]);

  const {
    pitch_link,
    bat_left_link,
    bat_right_link,
    left_add_link,
    left_main_link,
    right_add_link,
    right_main_link
  } = preview.camera_info || {};

  const MODE_LINKS = {
    'mode-1': [pitch_link],
    'mode-2': [bat_left_link, bat_right_link],
    'mode-3': [left_add_link, left_main_link, right_add_link, right_main_link],
    'mode-4': [left_add_link, left_main_link, right_add_link, right_main_link]
  };

  const videoId1 = getYouTubeID(MODE_LINKS[viewMode][0]) || 'WCjLd7QAJq8';
  const videoId2 = getYouTubeID(MODE_LINKS[viewMode][1]) || null;
  const videoId3 = getYouTubeID(MODE_LINKS[viewMode][2]) || null;
  const videoId4 = getYouTubeID(MODE_LINKS[viewMode][3]) || null;

  const viewModeNumber = +viewMode.slice(-1);

  const stateChangeHandler = (e, videoNumber) => {
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
  return (
    <>
      {viewModeNumber === 1 && (
        <Video videoId={videoId1} videoNumber={1} stateChangeHandler={stateChangeHandler} ref={video1Ref} />
      )}
      {viewModeNumber === 2 && (
        <>
          <Video videoId={videoId1} videoNumber={1} stateChangeHandler={stateChangeHandler} ref={video1Ref} />
          <Video videoId={videoId2} videoNumber={2} stateChangeHandler={stateChangeHandler} ref={video2Ref} />
        </>
      )}
      {viewModeNumber === 3 && (
        <>
          <Video videoId={videoId1} videoNumber={1} stateChangeHandler={stateChangeHandler} ref={video1Ref} />
          <Video videoId={videoId2} videoNumber={2} stateChangeHandler={stateChangeHandler} ref={video2Ref} />
          <Video videoId={videoId3} videoNumber={3} stateChangeHandler={stateChangeHandler} ref={video3Ref} />
          <Video videoId={videoId4} videoNumber={4} stateChangeHandler={stateChangeHandler} ref={video4Ref} />
        </>
      )}
      {viewModeNumber === 4 && (
        <>
          <Video videoId={videoId1} videoNumber={1} stateChangeHandler={stateChangeHandler} ref={video1Ref} />
          <Video videoId={videoId2} videoNumber={2} stateChangeHandler={stateChangeHandler} ref={video2Ref} />
          <Video videoId={videoId3} videoNumber={3} stateChangeHandler={stateChangeHandler} ref={video3Ref} />
          <Video videoId={videoId4} videoNumber={4} stateChangeHandler={stateChangeHandler} ref={video4Ref} />
        </>
      )}
    </>
  );
};

export default VideoList;
