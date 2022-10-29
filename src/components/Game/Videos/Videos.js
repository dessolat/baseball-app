import useCurrentEvents from 'hooks/useCurrentEvents';
import React from 'react';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import cl from './Videos.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import VideoEventsList from '../VideoEventsList/VideoEventsList';
import VideoList from '../VideoList/VideoList';

const Videos = () => {
  const viewMode = useSelector(state => state.game.viewMode);

//   const ref = useRef();

//   useEffect(() => {
//     function openFullscreen() {
// console.log(ref.current.requestFullscreen);


//       if (ref.current.webkitRequestFullscreen) {
//         ref.current.webkitRequestFullscreen();
//       } else if (ref.current.webkitRequestFullscreen) {
//         /* Safari */
//         ref.current.webkitRequestFullscreen();
//       } else if (ref.current.msRequestFullscreen) {
//         /* IE11 */
//         ref.current.msRequestFullscreen();
//       }
//     }

// 		openFullscreen()
//   }, [viewMode]);

  const wrapperClasses = classNames(cl.wrapper, {
    [cl.videos1]: viewMode === 'mode-1',
    [cl.videos2]: viewMode === 'mode-2',
    [cl.videos3]: viewMode === 'mode-3',
    [cl.videos4]: viewMode === 'mode-4'
  });

  return (
    <>
      <div className={wrapperClasses}>
      {/* <div className={wrapperClasses} ref={ref}> */}
        <VideoList viewMode={viewMode} />
        <VideoEventsList />
      </div>
      <div className={cl.eventsWrapper}>
        <PlaysEvents moments={useCurrentEvents()} />
      </div>
    </>
  );
};

export default Videos;
