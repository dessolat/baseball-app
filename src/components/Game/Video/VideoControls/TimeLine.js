import React, { forwardRef, useRef, useState } from 'react';
import { useEffect } from 'react';

const TimeLine = ({ cl, currentMoment }, ref) => {
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isProgressToBar, setIsProgressToBar] = useState(false);
  const [isCurrentTimeDot, setIsCurrentTimeDot] = useState(false);
  const [hoverXCoord, setHoverXCoord] = useState({ offsetX: 0, clientWidth: 0 });

  const intervalRef = useRef(null);

  const { seconds_from: secondsFrom, seconds_to: secondsTo } = currentMoment.video || {};

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      ref.current && setCurrentSeconds(ref.current.getCurrentTime() - secondsFrom);
    }, 80);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [secondsFrom]);

  const handleMouseMove = e => {
    setIsCurrentTimeDot(true);
    setIsProgressToBar(true);
    setHoverXCoord({ offsetX: e.nativeEvent.offsetX, clientWidth: e.target.clientWidth });
    console.log(e);
  };
  const handleMouseOut = e => {
    setIsCurrentTimeDot(false);
    setIsProgressToBar(false);
  };

  const totalSeconds = secondsTo - secondsFrom;
  // const totalMinutes = Math.floor(totalSeconds / 60);
  // const remainSeconds = Math.floor(totalSeconds - totalMinutes * 60);

  const percentPlayed = (100 * currentSeconds) / totalSeconds;
  const displayPercentPlayed = percentPlayed < 100 ? percentPlayed : 100;

  // const playedMinutes = Math.floor(currentSeconds / 60);
  // const playedSeconds = Math.floor(currentSeconds - playedMinutes * 60);
  // const playedSecondsFormatted = String(playedSeconds).length === 1 ? `0${playedSeconds}` : playedSeconds

  // const beforeTime = `${playedMinutes}:${playedSecondsFormatted}`

  const totalSecondsHover = totalSeconds * (hoverXCoord.offsetX / hoverXCoord.clientWidth);
	const minutesHover = Math.floor(totalSecondsHover / 60);
	const secondsHover = Math.floor(totalSecondsHover - minutesHover * 60);
	const secondsHoverFormatted = String(secondsHover).length === 1 ? `0${secondsHover}` : secondsHover

	const beforeTime = `${minutesHover}:${secondsHoverFormatted}`

  return (
    <div className={cl.timeLine}>
      <div className={cl.progressBar} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
        {isProgressToBar && (
          <div
            className={cl.progressToBar}
            style={{ width: hoverXCoord.offsetX }}
            data-before={beforeTime}
						></div>
        )}
        <div className={cl.progressPlayed} style={{ width: displayPercentPlayed + '%' }}></div>
        {isProgressToBar && (
          <div className={cl.currentTimeDot} style={{ left: `calc((${displayPercentPlayed}% - 6px)` }}></div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(TimeLine);
