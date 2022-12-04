import React, { useRef, useState } from 'react';
import cl from './Video.module.scss';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import NoVideoScreen from './NoVideoScreen';
import FullscreenBtn from 'components/UI/icons/VideoControlsBtns/FullscreenBtn/FullscreenBtn';
import { closeFullscreen, openFullscreen } from 'utils';
// import VideoControls from './VideoControls/VideoControls';

const Video = ({ videoId, videoNumber, handleOnReady, stateChangeHandler }) => {
  const [currentTime, setCurrentTime] = useState(0);

  // const [videoCurrentTime, setVideoCurrentTime] = useState(0)
  // const [isWrapperFullscreen, setWrapperFullscreen] = useState(false);

  const wrapperRef = useRef();

  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);

  const viewMode = useSelector(state => state.game.viewMode);

	const onReady = e => {
    handleOnReady(videoNumber, e.target);

    setInterval(() => {
      setCurrentTime(e.target.getCurrentTime().toFixed(2));
    }, 20);
  };

	const onStateChange = e => {
    stateChangeHandler(videoNumber, e.target, e.data);
  };



  

 

 

  // useEffect(() => {
  //   if (
  //     situationFilter !== 'All' ||
  //     !videoRef.current ||
  //     !currentCard.moments[momentRef.current + 1]?.video?.seconds_from
  //   )
  //     return;

  //   clearInterval(intervalRef.current);
  //   intervalRef.current = setInterval(() => {
  //     const currentTime = videoRef.current.getCurrentTime();

  //     if (currentTime >= endRef.current) {
  //       momentRef.current += 1;

  //       //If it's not last moment in the card
  //       if (momentRef.current < currentCard.moments.length) {
  //         videoRef.current.seekTo(currentCard.moments[momentRef.current].video.seconds_from);
  //         endRef.current = currentCard.moments[momentRef.current].video.seconds_to;
  //         //If last moment
  //       } else {
  //         if (modeRef.current === 'pause') {
  //           videoHandling();
  //         } else {
  //           let index = filteredCards.findIndex(
  //             card => card.moments[0].inner.id === currentCard.moments[0].inner.id
  //           );

  //           index++;

  //           if (index < filteredCards.length) {
  //             dispatch(setCurrentCard(filteredCards[index]));
  //             return;
  //           }

	// 					console.log('%cSet', 'color: red');
  //           dispatch(setPlaybackMode('pause'));
  //         }
  //       }
  //     }
  //   }, 50);
  //   // eslint-disable-next-line
  // }, [filteredCards]);


  const openFullScreen = () => {
    openFullscreen(wrapperRef.current);
  };
  const closeFullScreen = () => {
    closeFullscreen();
  };

  const videoClasses = classNames(cl.videoWrapper, {
    [cl.videoOne]: videoNumber === 1,
    [cl.videoTwo]: videoNumber === 2,
    [cl.videoThree]: videoNumber === 3,
    [cl.videoFour]: videoNumber === 4,
    [cl.aspectRatio16]: (videoNumber === 1 || videoNumber === 2) && viewMode === 'mode-2'
  });

  const fullscreenBtnClasses = classNames(cl.btnWrapper, {
    [cl.dnone]: viewMode.slice(-1) === '1',
    [cl.topLeftBtn]: videoNumber === 1,
    [cl.topRightBtn]: videoNumber === 2,
    [cl.bottomLeftBtn]: videoNumber === 3,
    [cl.bottomRightBtn]: videoNumber === 4
  });

  return (
    <div className={videoClasses} ref={wrapperRef}>
      {Object.keys(currentCard).length !== 0 ? (
        <>
          <YouTube
            videoId={'ZTsgKIKW8GE'}
            // videoId={videoId}
            // videoId={'WCjLd7QAJq8'}
            onReady={onReady}
            onStateChange={onStateChange}
            // onPlaybackRateChange={onPlaybackRateChange}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                disablekb: 1
                // loop: 1,
                // playlist: '-GR52czEd-0'
              }
            }}
          />
          {/* <span style={{position: 'absolute', left: 30, top: 30, color: 'white', fontWeight: 600}}>{currentMoment.video?.seconds_from.toFixed(2)}</span> */}
          <span
            style={{
              position: 'absolute',
              left: '50%',
              top: 30,
              transform: 'translateX(-50%)',
              color: 'white',
              fontWeight: 600
            }}>
            {currentTime}
          </span>
          {/* <span style={{position: 'absolute', left: '50%', top: 30, transform: 'translateX(-50%)', color: 'white', fontWeight: 600}}>{videoCurrentTime?.toFixed(2)}</span> */}
          {/* <span style={{position: 'absolute', right: 30, top: 30, color: 'white', fontWeight: 600}}>{currentMoment.video?.seconds_to.toFixed(2)}</span> */}
          <div className={fullscreenBtnClasses}>
            <button onClick={openFullScreen} className={cl.toFullScreen}>
              <FullscreenBtn isOff={true} width={'100%'} height={'100%'} />
            </button>
            <button onClick={closeFullScreen} className={cl.fromFullScreen}>
              <FullscreenBtn isOff={false} width={'100%'} height={'100%'} />
            </button>
          </div>
          {!currentMoment.video && <NoVideoScreen />}
          {/* {isCustomVideoControls && (
            <VideoControls
              controlsWrapper={cl.controlsWrapper}
              rateChangeHandler={rateChangeHandler}
              setPlayPause={setPlayPause}
              currentMoment={currentMoment}
              seekVideos={seekVideos}
              ref={videoRef}
            />
          )} */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Video;
