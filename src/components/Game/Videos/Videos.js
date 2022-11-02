// import useCurrentEvents from 'hooks/useCurrentEvents';
import React, { useRef } from 'react';
// import PlaysEvents from '../PlaysEvents/PlaysEvents';
import cl from './Videos.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
// import VideoEventsList from '../VideoEventsList/VideoEventsList';
import VideoList from '../VideoList/VideoList';
import FullscreenIcon from 'icons/fullscreen_icon.png';
import CloseFullscreenIcon from 'icons/close_fullscreen_icon.png';

const Videos = () => {
  const wrapperRef = useRef();
  const controlsWrapperRef = useRef();
  const timerRef = useRef();

  const viewMode = useSelector(state => state.game.viewMode);

  //   useEffect(() => {
  // function openFullscreen() {
  //   if (ref.current.webkitRequestFullscreen) {
  //     ref.current.webkitRequestFullscreen();
  //   } else if (ref.current.webkitRequestFullscreen) {
  //     /* Safari */
  //     ref.current.webkitRequestFullscreen();
  //   } else if (ref.current.msRequestFullscreen) {
  //     /* IE11 */
  //     ref.current.msRequestFullscreen();
  //   }
  // }
  // 		openFullscreen()
  //   }, [viewMode]);

  const wrapperClasses = classNames(cl.wrapper, {
    [cl.videos1]: viewMode === 'mode-1',
    [cl.videos2]: viewMode === 'mode-2',
    [cl.videos3]: viewMode === 'mode-3',
    [cl.videos4]: viewMode === 'mode-4'
  });

  const openFullscreen = ref => () => {
    if (ref.current.webkitRequestFullscreen) {
      ref.current.webkitRequestFullscreen();
    } else if (ref.current.webkitRequestFullscreen) {
      /* Safari */
      ref.current.webkitRequestFullscreen();
    } else if (ref.current.msRequestFullscreen) {
      /* IE11 */
      ref.current.msRequestFullscreen();
    }
  };
  const closeFullscreen = () => document.exitFullscreen();

  const handleMouseMove = () => {
    console.log(123);
    clearTimeout(timerRef.current);

    controlsWrapperRef.current.style.opacity = 1;

    timerRef.current = setTimeout(() => {
      controlsWrapperRef.current.style.opacity = 0;
    }, 1000);
  };
  return (
    <>
      <div className={wrapperClasses} onMouseMove={handleMouseMove} ref={wrapperRef}>
        {/* <div className={wrapperClasses} ref={ref}> */}
        <VideoList viewMode={viewMode} />
        {/* <VideoEventsList /> */}
        <div className={cl.controlsWrapper} ref={controlsWrapperRef}>
          <div className={cl.controls}>
            <button onClick={openFullscreen(wrapperRef)} className={cl.openFullscreen}>
              <img src={FullscreenIcon} alt='fullscreen-icon' />
            </button>
            <button onClick={closeFullscreen} className={cl.closeFullscreen}>
              <img src={CloseFullscreenIcon} alt='fullscreen-icon' />
            </button>
          </div>
        </div>
      </div>
      {/* <div className={cl.eventsWrapper}>
        <PlaysEvents />
      </div> */}
    </>
  );
};

export default Videos;
