import React, { forwardRef, useEffect, useRef } from 'react';
import cl from './Video.module.scss';
import YouTube from 'react-youtube';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentCard,
  setCurrentMoment,
  setPlaybackMode,
  setVideoCurrentTime,
  setVideoPlaybackRate
} from 'redux/gameReducer';
import classNames from 'classnames';
import NoVideoScreen from './NoVideoScreen';
import FullscreenBtn from 'components/UI/icons/VideoControlsBtns/FullscreenBtn/FullscreenBtn';
import { closeFullscreen, openFullscreen } from 'utils';
// import VideoControls from './VideoControls/VideoControls';

const Video = ({ videoId, videoNumber, stateChangeHandler }, ref) => {
  // const [videoCurrentTime, setVideoCurrentTime] = useState(0)
  // const [isWrapperFullscreen, setWrapperFullscreen] = useState(false);

  const videoRef = ref;

  const endRef = useRef(null);
  const intervalRef = useRef(null);
  const timeIntervalRef = useRef(null);
  const momentRef = useRef(0);
  const modeRef = useRef('play');
  const wrapperRef = useRef();
  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const situationFilter = useSelector(state => state.game.situationFilter);
  const viewMode = useSelector(state => state.game.viewMode);
  const videoState = useSelector(state => state.game.videoState);
  // const isFullscreen = useSelector(state => state.game.isFullscreen);
  // const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const element = wrapperRef.current

  //   element.addEventListener('fullscreenchange', resizeHandler);

  //   return () => {
  //     element?.removeEventListener('fullscreenchange', resizeHandler);
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);

  // function resizeHandler  ()  {
  // 	console.log(123);
  // 	console.log(
  // 		window.innerHeight,
  // 		window.innerWidth,
  // 		wrapperRef.current.clientHeight,
  // 		wrapperRef.current.clientWidth
  // 	);
  // 	const isFullscreen =
  // 		window.innerHeight === wrapperRef.current.clientHeight &&
  // 		window.innerWidth === wrapperRef.current.clientWidth;
  // 	setWrapperFullscreen(isFullscreen);
  // };

  useEffect(() => {
    if (videoRef.current === null) return;
    videoHandling();
    // eslint-disable-next-line
  }, [currentMoment]);

  useEffect(() => {
    modeRef.current = playbackMode;
  }, [playbackMode]);

  useEffect(() => {
    if (
      situationFilter !== 'All' ||
      !videoRef.current ||
      !currentCard.moments[momentRef.current + 1]?.video?.seconds_from
    )
      return;

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

  useEffect(() => {
    if (videoNumber !== 1) return;

    clearInterval(timeIntervalRef.current);

    timeIntervalRef.current = setInterval(() => {
      const time = videoRef.current?.getCurrentTime();

      videoState === 1 && dispatch(setVideoCurrentTime(time));
    }, 30);

    return () => {
      clearInterval(timeIntervalRef.current);
    };
    // eslint-disable-next-line
  }, [currentMoment, videoRef, videoState]);

  const onReady = e => {
    videoRef.current = e.target;
    videoHandling();
    videoNumber === 1 && dispatch(setVideoPlaybackRate(e.target.getPlaybackRate()));
  };

  const onStateChange = e => {
    stateChangeHandler(e, videoNumber, currentMoment?.video?.seconds_from || null);
  };

  // const onPlaybackRateChange = e => {
  //   rateChangeHandler(e);
  // };

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
      if (!videoRef.current) return;

      const currentTime = videoRef.current.getCurrentTime();

      if (currentTime >= endRef.current) {
        // momentRef.current += 1;
        if (modeRef.current === 'pause') {
          videoHandling();
          return;
        }
        const momentIndex = currentCard.moments.findIndex(
          moment => moment.inner.id === currentMoment.inner.id
        );
        if (momentIndex < currentCard.moments.length - 1) {
          // if (momentRef.current < currentCard.moments.length) {
          videoRef.current.seekTo(currentCard.moments[momentIndex + 1].video.seconds_from);
          dispatch(setCurrentMoment(currentCard.moments[momentIndex + 1]));
          // videoRef.current.seekTo(currentCard.moments[momentRef.current].video.seconds_from);
          endRef.current = currentCard.moments[momentIndex + 1].video.seconds_to;
          // endRef.current = currentCard.moments[momentRef.current].video.seconds_to;
        } else {
          let cardIndex = filteredCards.findIndex(
            card => card.moments[0].inner.id === currentCard.moments[0].inner.id
          );

          cardIndex++;

          if (cardIndex < filteredCards.length) {
            dispatch(setCurrentCard({ ...filteredCards[cardIndex], manualMoment: true }));
            return;
          }

          dispatch(setPlaybackMode('pause'));
        }
      }
    }, 50);
  };

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
  // const isCustomVideoControls = currentMoment.video?.seconds_from || currentMoment.video?.seconds_to;
  return (
    <div className={videoClasses} ref={wrapperRef}>
      {Object.keys(currentCard).length !== 0 ? (
        <>
          <YouTube
            videoId={videoId}
            // videoId={'WCjLd7QAJq8'}
            onReady={onReady}
            onStateChange={onStateChange}
            // onPlaybackRateChange={onPlaybackRateChange}
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
          {/* <span style={{position: 'absolute', left: 30, top: 30, color: 'white', fontWeight: 600}}>{currentMoment.video?.seconds_from.toFixed(2)}</span>
					<span style={{position: 'absolute', left: '50%', top: 30, transform: 'translateX(-50%)', color: 'white', fontWeight: 600}}>{videoCurrentTime?.toFixed(2)}</span>
					<span style={{position: 'absolute', right: 30, top: 30, color: 'white', fontWeight: 600}}>{currentMoment.video?.seconds_to.toFixed(2)}</span> */}
          <div className={fullscreenBtnClasses}>
            <button onClick={openFullScreen} className={cl.toFullScreen}>
              <FullscreenBtn isOff={true} width={'100%'} height={'100%'}  />
            </button>
            <button onClick={closeFullScreen} className={cl.fromFullScreen}>
              <FullscreenBtn isOff={false} width={'100%'} height={'100%'}  />
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

export default forwardRef(Video);
