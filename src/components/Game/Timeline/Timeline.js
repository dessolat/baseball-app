import TimelineEventChanger from 'components/UI/buttons/TimelineEventChanger/TimelineEventChanger';
import React, { Fragment, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  setSeekValue,
  setTimelineSliderCoords as setSliderCoords,
  setVideoCurrentTime
} from 'redux/gameReducer';
import DraggableArea from './DraggableArea';
import cl from './Timeline.module.scss';

const LINES = [
  { color: '#1A4C96', leftTitle: 'Ball' },
  { color: '#FFAB00', leftTitle: 'Hitter' },
  { color: '#BF8610', leftTitle: 'Run1' },
  // { color: '#8D6004', leftTitle: 'Run2' },
  // { color: '#5C4006', leftTitle: 'Run3' }
];

const VIEW_BOX_WIDTH = 825;
// const VIEW_BOX_WIDTH = 885;
// const SIDE_PADDINGS = 30;

const Timeline = ({ addedClass = null }) => {
  const videoLengthMode = useSelector(state => state.game.videoLengthMode);
  // const defaultState = videoLengthMode === 'Super Short' ? { x1: 35, x2: 65 } : { x1: 0, x2: 100 };
  // const [sliderCoords, setSliderCoords] = useState(defaultState);
  const sliderCoords = useSelector(state => state.game.timelineSliderCoords);
  const currentMoment = useSelector(state => state.game.currentMoment);

  const dispatch = useDispatch();

  const sliderRef = useRef();
  const sliderNameRef = useRef();
  const mouseDownXCoordRef = useRef();
  const mouseDownStateRef = useRef();
  const rectRef = useRef();
  const mouseClickTimeRef = useRef(null);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (!currentMoment.video) return;

    if (videoLengthMode !== 'Super Short') {
      dispatch(setSliderCoords({ x1: 0, x2: 100 }));
      return;
    }

    const { video } = currentMoment;

    const totalSeconds = video.short_seconds_to - video.short_seconds_from;

    const startSecondsDelta = video.super_short_seconds_from - video.short_seconds_from;
    const startSecondsPercent = (startSecondsDelta * 100) / totalSeconds;

    const endSecondsDelta = video.super_short_seconds_to - video.short_seconds_from;
    const endSecondsPercent = (endSecondsDelta * 100) / totalSeconds;

    dispatch(setSliderCoords({ x1: startSecondsPercent, x2: endSecondsPercent }));

    // const newCoords = videoLengthMode === 'Super Short' ? { x1: 35, x2: 65 } : { x1: 0, x2: 100 };
  }, [currentMoment, videoLengthMode]);

  function handleMouseMove(e) {
    const slider = sliderRef.current;
    const parent = slider.parentElement;

    let currentCoord =
      e.clientX <= parent.getBoundingClientRect().left
        ? 0
        : e.clientX > parent.getBoundingClientRect().right
        ? parent.getBoundingClientRect().width
        : e.clientX - parent.getBoundingClientRect().left;

    const currentCoordPercents = +((currentCoord * 100) / parent.getBoundingClientRect().width).toFixed(4);

    if (sliderNameRef.current === 'left-line') {
      dispatch(
        setSliderCoords({
          ...sliderCoords,
          x1: sliderCoords.x2 - 5 > currentCoordPercents ? currentCoordPercents : sliderCoords.x2 - 5
        })
      );

      return;
    }
    if (sliderNameRef.current === 'right-line') {
      dispatch(
        setSliderCoords({
          ...sliderCoords,
          x2: sliderCoords.x1 + 5 < currentCoordPercents ? currentCoordPercents : sliderCoords.x1 + 5
        })
      );
      return;
    }

    if (sliderNameRef.current === 'drag-area') {
      const slider = sliderRef.current;
      const parent = slider.parentElement;

      const percentRatio = parent.getBoundingClientRect().width / 100;
      const pixelsDelta = e.clientX - mouseDownXCoordRef.current;
      const percentsDelta = +(pixelsDelta / percentRatio).toFixed(4);

      const getCoords = () => {
        let tempX1 = sliderCoords.x1;
        let tempX2 = sliderCoords.x2;

        if (mouseDownStateRef.current.x1 + percentsDelta < 0) {
          tempX1 = 0;
          tempX2 = mouseDownStateRef.current.x2 - mouseDownStateRef.current.x1;

          return { x1: tempX1, x2: tempX2 };
        }

        if (mouseDownStateRef.current.x2 + percentsDelta > 100) {
          tempX1 = mouseDownStateRef.current.x1 + (100 - mouseDownStateRef.current.x2);
          tempX2 = 100;

          return { x1: tempX1, x2: tempX2 };
        }

        return {
          x1: mouseDownStateRef.current.x1 + percentsDelta,
          x2: mouseDownStateRef.current.x2 + percentsDelta
        };
      };

      dispatch(setSliderCoords(getCoords()));
      return;
    }
  }

  const handleMouseUp = e => {
    sliderRef.current.parentElement.style.cursor = 'default';
    if (sliderNameRef.current.includes('line')) rectRef.current.style.cursor = 'grab';

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    const mouseClickDelta = Date.now() - mouseClickTimeRef.current;
    if (mouseClickDelta < 140) {
      const slider = sliderRef.current;
      const parent = slider.parentElement;

      let currentCoord =
        e.clientX <= parent.getBoundingClientRect().left
          ? 0
          : e.clientX > parent.getBoundingClientRect().right
          ? parent.getBoundingClientRect().width
          : e.clientX - parent.getBoundingClientRect().left;

      const currentCoordPercents = +((currentCoord * 100) / parent.getBoundingClientRect().width).toFixed(4);

      const { video } = currentMoment;
      const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

      const secondsTotal =
        video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];
      const seekToValue =
        video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal * currentCoordPercents) / 100;
      dispatch(setSeekValue(seekToValue));
      dispatch(setVideoCurrentTime(seekToValue));
    }
  };

  const handleMouseDown = e => {
    mouseClickTimeRef.current = Date.now();

    sliderRef.current = e.target;
    sliderNameRef.current = e.target.attributes.name.value;
    mouseDownXCoordRef.current = e.clientX;
    mouseDownStateRef.current = JSON.parse(JSON.stringify(sliderCoords));

    sliderRef.current.parentElement.style.cursor = 'e-resize';
    if (sliderNameRef.current.includes('line')) rectRef.current.style.cursor = 'e-resize';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';
  // const videoLengthPrefix = videoLengthMode.toLowerCase().replace(' ', '_');
  const totalSeconds = currentMoment.video
    ? currentMoment.video[`${videoLengthPrefix}_seconds_to`] -
      currentMoment.video[`${videoLengthPrefix}_seconds_from`]
    : 0;
  // const totalSeconds = currentMoment.video
  //   ? currentMoment.video.seconds_to - currentMoment.video.seconds_from
  //   : 0;
  const minutesSide = Math.floor(totalSeconds / 60);
  const secondsSide = (totalSeconds - minutesSide * 60).toFixed(0);
  const rightTitle = `${minutesSide}:${secondsSide.length === 1 ? 0 : ''}${secondsSide}`;
  return (
    <div className={cl.wrapper + ' ' + addedClass}>
      <div className={cl.eventsBtnsWrapper}>
        <TimelineEventChanger />
        <TimelineEventChanger direction='right' />
      </div>
      <svg viewBox={`0 0 30 52`} className={cl.sideChart} preserveAspectRatio='none'>
        {/* Left titles */}
        {LINES.map(({ leftTitle }, i) => (
          <text key={i} x='2' y={(i + 2) * 9 + 3} className={cl.leftTitle}>
            {leftTitle}
          </text>
        ))}
      </svg>
      <svg viewBox={`0 0 ${VIEW_BOX_WIDTH} 52`} className={cl.chart} preserveAspectRatio='none'>
        {/* Horizontal lines */}
        {LINES.map(({ color }, i) => (
          <line
            key={i}
            x1='0'
            y1={(i + 2) * 9}
            x2={VIEW_BOX_WIDTH}
            y2={(i + 2) * 9}
            stroke={color}
            strokeWidth='1'
          />
        ))}

        {/* Lines text */}
        {/* {LINES.map((_, i) => (
          <Fragment key={i}>
            <rect x={55 + i * 31} y={(i + 1) * 9 - 6} width='24' height='10' fill='#fff' />
            <text x={57.87 + i * 31} y={(i + 1) * 9 + 2.9} className={cl.horizontalLineText}>
              P-H
            </text>
            <rect x={55 + i * 31 + 273} y={(i + 1) * 9 - 6} width='24' height='10' fill='#fff' />
            <text x={57.87 + i * 31 + 273} y={(i + 1) * 9 + 2.9} className={cl.horizontalLineText}>
              P-H
            </text>
            <rect x={55 + i * 31 + 546} y={(i + 1) * 9 - 6} width='24' height='10' fill='#fff' />
            <text x={57.87 + i * 31 + 546} y={(i + 1) * 9 + 2.9} className={cl.horizontalLineText}>
              P-H
            </text>
          </Fragment>
        ))} */}

				{/* Ball line rect & text */}
        <rect x={86} y={(1 + 1) * 9 - 4} fill={LINES[0].color} width='24' height='8' />
        <text x={98} y={(1 + 1) * 9 + 2.9} className={cl.horizontalLineText}>
          P-H
        </text>
        <rect x={115} y={(1 + 1) * 9 - 4} fill={LINES[0].color} width='700' height='8' />
        <text x={465} y={(1 + 1) * 9 + 2.9} className={cl.horizontalLineText}>
          H-RF
        </text>
				{/* Hitter line rect & text */}
        <rect x={135} y={(1 + 2) * 9 - 4} fill={LINES[1].color} width='76' height='8' />
        <text x={173} y={(1 + 2) * 9 + 2.9} className={cl.horizontalLineText}>
          H-B1
        </text>
        <rect x={214} y={(1 + 2) * 9 - 4} fill={LINES[1].color} width='80' height='8' />
        <text x={254} y={(1 + 2) * 9 + 2.9} className={cl.horizontalLineText}>
          B1-B2
        </text>
				{/* Run1 line rect & text */}
        <rect x={135} y={(1 + 3) * 9 - 4} fill={LINES[2].color} width='56' height='8' />
        <text x={163} y={(1 + 3) * 9 + 2.9} className={cl.horizontalLineText}>
          B1-B2
        </text>
        <rect x={194} y={(1 + 3) * 9 - 4} fill={LINES[2].color} width='60' height='8' />
        <text x={224} y={(1 + 3) * 9 + 2.9} className={cl.horizontalLineText}>
          B2-B3
        </text>
        <rect x={257} y={(1 + 3) * 9 - 4} fill={LINES[2].color} width='60' height='8' />
        <text x={287} y={(1 + 3) * 9 + 2.9} className={cl.horizontalLineText}>
          B3-HOME
        </text>

        {/* Draggable area */}
        {totalSeconds > 0 && (
          <DraggableArea
            x1={sliderCoords.x1}
            x2={sliderCoords.x2}
            handleMouseDown={handleMouseDown}
            viewBoxWidth={VIEW_BOX_WIDTH}
            totalSeconds={totalSeconds}
            videoLengthPrefix={videoLengthPrefix}
            ref={rectRef}
          />
        )}
      </svg>
      <svg viewBox={`0 0 30 52`} className={cl.sideChart} preserveAspectRatio='none'>
        <text x='4' y='30' className={cl.rightTitle}>
          {rightTitle}
        </text>
      </svg>
    </div>
  );
};

export default Timeline;
