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
  const nextMomentTimeoutRef = useRef();

  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const situationFilter = useSelector(state => state.game.situationFilter);
  const viewMode = useSelector(state => state.game.viewMode);
  const videoLengthMode = useSelector(state => state.game.videoLengthMode);
  const videoState = useSelector(state => state.game.videoState);
  const sliderCoords = useSelector(state => state.game.timelineSliderCoords);
  const isLastMomentMode = useSelector(state => state.game.isLastMomentMode);

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

		videoRef.current.pauseVideo();

		const { video } = currentMoment;

    if (video) {
      const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

      const secondsTotal =
        video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];

      const secondsFromRated =
        video[`${videoLengthPrefix}_seconds_from`] +
        (secondsTotal / 100) * (sliderCoords.changedCoord !== 'x2' ? sliderCoords.x1 : sliderCoords.x2);

				videoRef.current?.seekTo(secondsFromRated);
    }

		setTimeout(
      () => {
        videoHandling();
      },
      videoLengthMode === 'Super Short' ? 1500 : 30
    );
    // videoHandling();
    // eslint-disable-next-line
  }, [currentMoment, sliderCoords]);

  useEffect(() => {
    if (videoRef.current === null) return;

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

        //If it's not last moment in the card
        if (momentRef.current < currentCard.moments.length) {
          videoRef.current.seekTo(currentCard.moments[momentRef.current].video.seconds_from);
          endRef.current = currentCard.moments[momentRef.current].video.seconds_to;
          //If last moment
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
    }, 50);
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

  function toNextMomentOrCard() {
    const momentIndex = currentCard.moments.findIndex(moment => moment.inner.id === currentMoment.inner?.id);

    if (momentIndex < currentCard.moments.length - 1) {
      const nextMoment = currentCard.moments[momentIndex + 1];

      dispatch(setCurrentMoment(nextMoment));

      if (!nextMoment.video) return;

      const { video: nextVideo } = nextMoment;
      const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

      const secondsTotal =
        nextVideo[`${videoLengthPrefix}_seconds_to`] - nextVideo[`${videoLengthPrefix}_seconds_from`];
      // const secondsTotal = nextMoment.video.seconds_to - nextMoment.video.seconds_from;
      const secondsFromRated =
        nextVideo[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x1;
      videoRef.current.seekTo(secondsFromRated);
      // videoRef.current.seekTo(nextMoment.video.seconds_from);

      const secondsToRated =
        nextVideo[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x2;
      endRef.current = secondsToRated;
      // endRef.current = nextMoment.video.seconds_to;
    } else {
      let cardIndex = filteredCards.findIndex(
        card => card.moments[0].inner.id === currentCard.moments[0].inner.id
      );

      cardIndex++;

      if (cardIndex < filteredCards.length) {
        console.log(isLastMomentMode);
        dispatch(setCurrentCard({ ...filteredCards[cardIndex], toFirstMoment: !isLastMomentMode }));
        // dispatch(setCurrentCard({ ...filteredCards[cardIndex], manualMoment: !isLastMomentMode }));
        return;
      }

      dispatch(setPlaybackMode('pause'));
    }
  }

  const videoHandling = (doSeek = true) => {
    clearInterval(intervalRef.current);
    // momentRef.current = 0;

    if (!currentMoment.video) {
      videoRef.current.pauseVideo();

      if (modeRef.current !== 'pause') {
        console.log('not paused');
        nextMomentTimeoutRef.current = setTimeout(toNextMomentOrCard, 3000);
				
      }

      return;
    }

    if (currentCard.moments.length === 0 || !currentCard.moments[0].video) {
      videoRef.current.pauseVideo();
      return;
    }

    videoRef.current.getPlayerState() !== 1 && videoRef.current.playVideo();

    const { video } = currentMoment;
    const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

    const secondsTotal =
      video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];
    // const secondsTotal = video.seconds_to - video.seconds_from;
    const secondsFromRated =
      video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x1;
    // const secondsFromRated = video.seconds_from + (secondsTotal / 100) * sliderCoords.x1;
    doSeek && videoRef.current.seekTo(secondsFromRated);
    // videoRef.current.seekTo(currentMoment.video.seconds_from);
    // videoRef.current.seekTo(currentCard.moments[0].video.seconds_from);

    const secondsToRated =
      video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal / 100) * sliderCoords.x2;
    // const secondsToRated = video.seconds_from + (secondsTotal / 100) * sliderCoords.x2;

    endRef.current = secondsToRated;
    // endRef.current = currentMoment.video.seconds_to;

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

        //To next moment or card
        toNextMomentOrCard();
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

export default forwardRef(Video);
