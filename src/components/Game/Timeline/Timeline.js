import TimelineEventChanger from 'components/UI/buttons/TimelineEventChanger/TimelineEventChanger';
import React, { useRef, useEffect, useLayoutEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  setSeekValue,
  setTimelineSliderCoords as setSliderCoords,
  setVideoCurrentTime
} from 'redux/gameReducer';
import DraggableArea from './DraggableArea';
import cl from './Timeline.module.scss';

const VIEW_BOX_WIDTH = 825;
// const VIEW_BOX_WIDTH = 885;
// const SIDE_PADDINGS = 30;

const Timeline = ({ addedClass = null }) => {
  const videoLengthMode = useSelector(state => state.game.videoLengthMode);
  // const defaultState = videoLengthMode === 'Super Short' ? { x1: 35, x2: 65 } : { x1: 0, x2: 100 };
  // const [sliderCoords, setSliderCoords] = useState(defaultState);
  const sliderCoords = useSelector(state => state.game.timelineSliderCoords);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);

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
    // eslint-disable-next-line
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
          x2: sliderCoords.x1 + 5 < currentCoordPercents ? currentCoordPercents : sliderCoords.x1 + 5,
          changedCoord: 'x2'
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

  const totalSeconds = currentMoment.video
    ? currentMoment.video[`${videoLengthPrefix}_seconds_to`] -
      currentMoment.video[`${videoLengthPrefix}_seconds_from`]
    : 0;

  const minutesSide = Math.floor(totalSeconds / 60);
  const secondsSide = (totalSeconds - minutesSide * 60).toFixed(0);
  const rightTitle = `${minutesSide}:${secondsSide.length === 1 ? 0 : ''}${secondsSide}`;

  // Lines positioning
  let LINES_NUMBER = 0;
  let Y_SHIFT;
  const LINES_DATA = [];
  const LINES_TEXT_ABBR = ['H', 'B1', 'B2', 'B3'];

  const getRelativeX = time => {
    const totalSecsToX = time - (currentMoment.video[`${videoLengthPrefix}_seconds_from`] ?? 0);

    const timelinePercents = (totalSecsToX * 100) / totalSeconds;
    const relativeX = (VIEW_BOX_WIDTH / 100) * timelinePercents;
    return relativeX;
  };

  if (currentMoment.metering) {
    const { bases, pitch, play, hit, field } = currentMoment.metering;

    // Lines number calculating
    if (pitch) LINES_NUMBER++;
    if (hit) LINES_NUMBER++;
    LINES_NUMBER = Object.values(bases).reduce((sum, base) => (base ? sum + 1 : sum), LINES_NUMBER);

    // Y shift calc
    Y_SHIFT = 4.5 * (LINES_NUMBER - 1);

    // Lines data compute
    pitch &&
      LINES_DATA.push({
        title: 'Ball',
        color: '#1A4C96',
        timeStart1: pitch.time_start,
        timeEnd1: pitch.time_end,
        timeStart2: play.time_start,
        timeEnd2: play.time_end
      });
    hit &&
      LINES_DATA.push({
        title: 'Hitter',
        color: '#FFAB00',
        timeStart1: hit.time_start,
        timeEnd1: hit.time_end,
        timeStart2: field.who === 0 ? field.time_start : null,
        timeEnd2: field.who === 0 ? field.time_end : null,
        textFrom2: field.who === 0 ? LINES_TEXT_ABBR[field.run_from] : null,
        textTo2: field.who === 0 ? LINES_TEXT_ABBR[field.run_to] : null
      });
    bases.r1 &&
      LINES_DATA.push({
        title: 'Run1',
        color: '#BF8610',
        timeStart1: field.who === 1 ? field.time_start : null,
        timeEnd1: field.who === 1 ? field.time_end : null,
        textFrom1: field.who === 1 ? LINES_TEXT_ABBR[field.run_from] : null,
        textTo1: field.who === 1 ? LINES_TEXT_ABBR[field.run_to] : null
      });
    bases.r2 &&
      LINES_DATA.push({
        title: 'Run2',
        color: '#8D6004',
        timeStart1: field.who === 2 ? field.time_start : null,
        timeEnd1: field.who === 2 ? field.time_end : null,
        textFrom1: field.who === 2 ? LINES_TEXT_ABBR[field.run_from] : null,
        textTo1: field.who === 2 ? LINES_TEXT_ABBR[field.run_to] : null
      });
    bases.r3 &&
      LINES_DATA.push({
        title: 'Run3',
        color: '#5C4006',
        timeStart1: field.who === 3 ? field.time_start : null,
        timeEnd1: field.who === 3 ? field.time_end : null,
        textFrom1: field.who === 3 ? LINES_TEXT_ABBR[field.run_from] : null,
        textTo1: field.who === 3 ? LINES_TEXT_ABBR[field.run_to] : null
      });
  }

  return (
    <div className={cl.wrapper + ' ' + addedClass}>
      <div className={cl.eventsBtnsWrapper}>
        <TimelineEventChanger />
        <TimelineEventChanger direction='right' />
      </div>
      <svg viewBox={`0 0 30 52`} className={cl.sideChart} preserveAspectRatio='none'>
        {/* Left titles */}
        {LINES_NUMBER > 0 &&
          LINES_DATA.map(({ title }, i) => (
            <text key={i} x='2' y={(i + 3) * 9 + 3 - Y_SHIFT} className={cl.leftTitle}>
              {title}
            </text>
          ))}
      </svg>
      <svg viewBox={`0 0 ${VIEW_BOX_WIDTH} 52.5`} className={cl.chart} preserveAspectRatio='none'>
        {LINES_NUMBER > 0 && (
          <>
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

            {/* Horizontal lines */}
            {LINES_DATA.map(
              (
                { color, timeStart1, timeEnd1, timeStart2, timeEnd2, textFrom1, textTo1, textFrom2, textTo2 },
                i
              ) => (
                // Horizontal line
                <Fragment key={i}>
                  <line
                    key={i}
                    x1='0'
                    y1={(i + 3) * 9 - Y_SHIFT}
                    x2={VIEW_BOX_WIDTH}
                    y2={(i + 3) * 9 - Y_SHIFT}
                    stroke={color}
                    strokeWidth='0.5'
                  />
                  {timeStart1 && (
                    <>
                      <rect
                        x={getRelativeX(timeStart1)}
                        y={(i + 3) * 9 - 4 - Y_SHIFT}
                        fill={color}
                        width={getRelativeX(timeEnd1) - getRelativeX(timeStart1)}
                        height='8'
                        className={cl.eventRect}
                      />
                      <text
                        x={getRelativeX(timeStart1) + (getRelativeX(timeEnd1) - getRelativeX(timeStart1)) / 2}
                        y={(i + 3) * 9 + 2.9 - Y_SHIFT}
                        className={cl.horizontalLineText}>
                        {textFrom1}-{textTo1}
                      </text>
                    </>
                  )}
                  {timeStart2 && (
                    <>
                      <rect
                        x={getRelativeX(timeStart2)}
                        y={(i + 3) * 9 - 4 - Y_SHIFT}
                        fill={color}
                        width={getRelativeX(timeEnd2) - getRelativeX(timeStart2)}
                        height='8'
                        className={cl.eventRect}
                      />
                      <text
                        x={getRelativeX(timeStart2) + (getRelativeX(timeEnd2) - getRelativeX(timeStart2)) / 2}
                        y={(i + 3) * 9 + 2.9 - Y_SHIFT}
                        className={cl.horizontalLineText}>
                        {textFrom2}-{textTo2}
                      </text>
                    </>
                  )}
                </Fragment>
                // Rect
              )
            )}

            {/* Ball line rect & text */}
            {/* <rect
              x={86}
              y={(1 + 1) * 9 - 4}
              fill={LINES_DATA[0].color}
              width='24'
              height='8'
              className={cl.eventRect}
            />
            <text x={98} y={(1 + 1) * 9 + 2.9} className={cl.horizontalLineText}>
              P-H
            </text>
            <rect
              x={115}
              y={(1 + 1) * 9 - 4}
              fill={LINES_DATA[0].color}
              width='700'
              height='8'
              className={cl.eventRect}
            />
            <text x={465} y={(1 + 1) * 9 + 2.9} className={cl.horizontalLineText}>
              H-RF
            </text> */}
            {/* Hitter line rect & text */}
            {/* <rect
              x={135}
              y={(1 + 2) * 9 - 4}
              fill={LINES_DATA[1].color}
              width='76'
              height='8'
              className={cl.eventRect}
            />
            <text x={173} y={(1 + 2) * 9 + 2.9} className={cl.horizontalLineText}>
              H-B1
            </text>
            <rect
              x={214}
              y={(1 + 2) * 9 - 4}
              fill={LINES_DATA[1].color}
              width='80'
              height='8'
              className={cl.eventRect}
            />
            <text x={254} y={(1 + 2) * 9 + 2.9} className={cl.horizontalLineText}>
              B1-B2
            </text> */}
            {/* Run1 line rect & text */}
            {/* <rect
              x={135}
              y={(1 + 3) * 9 - 4}
              fill={LINES_DATA[2].color}
              width='56'
              height='8'
              className={cl.eventRect}
            />
            <text x={163} y={(1 + 3) * 9 + 2.9} className={cl.horizontalLineText}>
              B1-B2
            </text>
            <rect
              x={194}
              y={(1 + 3) * 9 - 4}
              fill={LINES_DATA[2].color}
              width='60'
              height='8'
              className={cl.eventRect}
            />
            <text x={224} y={(1 + 3) * 9 + 2.9} className={cl.horizontalLineText}>
              B2-B3
            </text>
            <rect
              x={257}
              y={(1 + 3) * 9 - 4}
              fill={LINES_DATA[2].color}
              width='60'
              height='8'
              className={cl.eventRect}
            />
            <text x={287} y={(1 + 3) * 9 + 2.9} className={cl.horizontalLineText}>
              B3-HOME
            </text> */}
            <use href='#left-border-line' />
            <use href='#red-border-line' />
            <use href='#right-border-line' />
          </>
        )}
      </svg>
      <svg viewBox={`0 0 30 52`} className={cl.sideChart} preserveAspectRatio='none'>
        {LINES_NUMBER > 0 && (
          <text x='4' y='30' className={cl.rightTitle}>
            {rightTitle}
          </text>
        )}
      </svg>
    </div>
  );
};

export default Timeline;
