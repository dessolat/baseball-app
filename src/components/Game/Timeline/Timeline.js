import TimelineEventChanger from 'components/UI/buttons/TimelineEventChanger/TimelineEventChanger';
import useGameFocus from 'hooks/useGameFocus';
import React, { useRef, useEffect, useLayoutEffect, Fragment } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  setSeekValue,
  setTimelineSliderCoords as setSliderCoords,
  setTimelineWidth as setChartWidth,
  setFullTimelineWidth as setFullChartWidth,
  setVideoCurrentTime
} from 'redux/gameReducer';
import DraggableArea from './DraggableArea';
import cl from './Timeline.module.scss';
import classNames from 'classnames';

const Timeline = ({ addedClass = null, currentTab = 'videos', forFullscreen = false }) => {
  const videoLengthMode = useSelector(s => s.game.videoLengthMode);
  const sliderCoords = useSelector(s => s.game.timelineSliderCoords, shallowEqual);
  const currentMoment = useSelector(s => s.game.currentMoment, shallowEqual);
  const videoCurrentTime = useSelector(s => s.game.videoCurrentTime);
  const isFullscreen = useSelector(s => s.game.isFullscreen);
  const isBroadcast = useSelector(s => s.game.isBroadcast);
  const focus = useSelector(s => s.game.focus);
  const preview = useSelector(s => s.game.preview);
  const viewMode = useSelector(s => s.game.viewMode);

  const mobileWidth = useSelector(s => s.shared.mobileWidth);
  const isMobile = useSelector(s => s.shared.isMobile);
  const isMobileTimeline = useSelector(s => s.shared.isMobileTimeline);
  const isMobileScoreboard = useSelector(s => s.shared.isMobileScoreboard);

  const fullTimelineWidth = useSelector(s => s.game.fullTimelineWidth);
  const timelineWidth = useSelector(s => s.game.timelineWidth);

  const chartWidth =
    (isMobile && document.documentElement.clientWidth > document.documentElement.clientHeight) ||
    forFullscreen
      ? fullTimelineWidth
      : timelineWidth;

  const dispatch = useDispatch();

  const sliderRef = useRef();
  const sliderNameRef = useRef();
  const mouseDownXCoordRef = useRef();
  const mouseDownStateRef = useRef();
  const rectRef = useRef();
  const mouseClickTimeRef = useRef(null);
  const chartRef = useRef(null);
  const firstLoadRef = useRef(true);

  const isFirstBroadcastedVideo =
    currentTab === 'videos' &&
    !isBroadcast &&
    viewMode === 'mode-1' &&
    JSON.parse(preview.camera_views[0]).cameras[0] === 'broadcast_link';

  const videoLengthPrefix = isFirstBroadcastedVideo
    ? 'broadcast'
    : videoLengthMode.toLowerCase().replace(' ', '_');

  const SECONDS_SRC = currentMoment.video
    ? {
        pitch: {
          timeStart:
            currentMoment.metering?.pitch?.time_start_pitch_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd:
            currentMoment.metering?.pitch?.time_end_pitch_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_to`]
        },
        hitting: {
          timeStart:
            currentMoment.metering?.hit?.time_start_hit_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd:
            currentMoment.metering?.hit?.time_end_hit_window ||
            currentMoment.video[`${videoLengthPrefix}_seconds_to`]
        },
        running: {
          timeStart: currentMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd: currentMoment.video[`${videoLengthPrefix}_seconds_to`]
        },
        videos: {
          timeStart: currentMoment.video[`${videoLengthPrefix}_seconds_from`],
          timeEnd: currentMoment.video[`${videoLengthPrefix}_seconds_to`]
        }
      }
    : {};

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [handleKeyDown]);

  useEffect(() => {
    if (chartRef.current.clientWidth === 0) return;

    dispatch(
      forFullscreen
        ? setFullChartWidth(chartRef.current.clientWidth)
        : setChartWidth(chartRef.current.clientWidth)
    );
  }, [mobileWidth, isFullscreen]);

  useLayoutEffect(() => {
    if (firstLoadRef.current === true) return;

    if (!currentMoment.video) return;

    dispatch(setSliderCoords({ x1: 0, x2: 100 }));

    // Old super short method
    // if (videoLengthMode !== 'Super Short') {
    //   dispatch(setSliderCoords({ x1: 0, x2: 100 }));
    //   return;
    // }

    // const { video } = currentMoment;

    // const totalSeconds = video.short_seconds_to - video.short_seconds_from;

    // const startSecondsDelta = video.super_short_seconds_from - video.short_seconds_from;
    // const startSecondsPercent = (startSecondsDelta * 100) / totalSeconds;

    // const endSecondsDelta = video.super_short_seconds_to - video.short_seconds_from;
    // const endSecondsPercent = (endSecondsDelta * 100) / totalSeconds;

    // dispatch(setSliderCoords({ x1: startSecondsPercent, x2: endSecondsPercent }));

    // const newCoords = videoLengthMode === 'Super Short' ? { x1: 35, x2: 65 } : { x1: 0, x2: 100 };
    // eslint-disable-next-line
  }, [currentMoment]);

  useLayoutEffect(() => {
    if (firstLoadRef.current === true) {
      firstLoadRef.current = false;
      return;
    }

    if (!currentMoment.video) return;

    dispatch(setSliderCoords({ x1: 0, x2: 100, noChange: true }));

    // eslint-disable-next-line
  }, [videoLengthMode]);

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
          x1: sliderCoords.x2 - 1 > currentCoordPercents ? currentCoordPercents : sliderCoords.x2 - 1,
          changedCoord: 'x1'
        })
      );

      return;
    }
    if (sliderNameRef.current === 'right-line') {
      dispatch(
        setSliderCoords({
          ...sliderCoords,
          x2: sliderCoords.x1 + 1 < currentCoordPercents ? currentCoordPercents : sliderCoords.x1 + 1,
          changedCoord: 'x2'
        })
      );
      return;
    }
    if (sliderNameRef.current === 'red-line') {
      const secondsTotal = SECONDS_SRC[currentTab].timeEnd - SECONDS_SRC[currentTab].timeStart;
      const seekToValue = SECONDS_SRC[currentTab].timeStart + (secondsTotal * currentCoordPercents) / 100;

      const leftSliderTime = SECONDS_SRC[currentTab].timeStart + (secondsTotal * sliderCoords.x1) / 100;
      // const secondsTotal =
      //   video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];
      // const seekToValue =
      //   video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal * currentCoordPercents) / 100;

      // const leftSliderTime =
      //   video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal * sliderCoords.x1) / 100;

      const seekToTime = seekToValue <= leftSliderTime ? leftSliderTime : seekToValue;

      dispatch(setSeekValue(seekToTime));
      dispatch(setVideoCurrentTime(seekToTime));

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

      // Old videoLengthPrefix method
      // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

      const secondsTotal = SECONDS_SRC[currentTab].timeEnd - SECONDS_SRC[currentTab].timeStart;
      const seekToValue = SECONDS_SRC[currentTab].timeStart + (secondsTotal * currentCoordPercents) / 100;
      // const secondsTotal =
      //   video[`${videoLengthPrefix}_seconds_to`] - video[`${videoLengthPrefix}_seconds_from`];
      // const seekToValue =
      //   video[`${videoLengthPrefix}_seconds_from`] + (secondsTotal * currentCoordPercents) / 100;
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

  // Old method
  // const videoLengthPrefix = videoLengthMode === 'Full' ? 'full' : 'short';

  const totalSeconds = currentMoment.video
    ? SECONDS_SRC[currentTab].timeEnd - SECONDS_SRC[currentTab].timeStart
    : 0;
  // const totalSeconds = currentMoment.video
  //   ? currentMoment.video[`${videoLengthPrefix}_seconds_to`] -
  //     currentMoment.video[`${videoLengthPrefix}_seconds_from`]
  //   : 0;

  const minutesSide = Math.floor(totalSeconds / 60);
  const secondsSide = (totalSeconds - minutesSide * 60).toFixed(0);
  const rightTitle = `${minutesSide}:${secondsSide.length === 1 ? 0 : ''}${secondsSide}`;

  // Lines positioning
  let LINES_NUMBER = 1;
  // let LINES_NUMBER = 0;
  let Y_SHIFT;
  const LINES_DATA = [];
  const LINES_TEXT_ABBR = ['H', 'B1', 'B2', 'B3'];

  const getRelativeX = time => {
    const totalSecsToX = time - (SECONDS_SRC[currentTab].timeStart ?? 0);
    // const totalSecsToX = time - (currentMoment.video[`${videoLengthPrefix}_seconds_from`] ?? 0);

    const timelinePercents = (totalSecsToX * 100) / totalSeconds;
    const relativeX = (chartWidth / 100) * timelinePercents;
    return relativeX;
  };

  if (currentMoment.metering) {
    const { bases, pitch, play, hit, field } = currentMoment.metering;

    // Lines number calculating
    if (pitch) LINES_NUMBER++;
    // if (hit) LINES_NUMBER++;
    LINES_NUMBER = Object.values(bases).reduce((sum, base) => (base ? sum + 1 : sum), LINES_NUMBER);

    // Y shift calc
    Y_SHIFT = 4.5 * (LINES_NUMBER - 1);

    // Lines data compute
    // Pitch line calc
    if (pitch) {
      const tempLineData = {
        title: 'Ball',
        color: '#1A4C96',
        secondaryColor: '#4D80CB',
        events: []
      };

      pitch?.time_start && tempLineData.events.push({ timeStart: pitch.time_start, timeEnd: pitch.time_end });
      hit?.time_start && tempLineData.events.push({ timeStart: hit.time_start, timeEnd: hit.time_end });
      play.forEach(value =>
        tempLineData.events.push({ timeStart: value.time_start, timeEnd: value.time_end })
      );
      LINES_DATA.push(tempLineData);
    }

    //Hitter line calc
    const tempLineData = {
      title: 'Hitter',
      color: '#FFAB00',
      secondaryColor: '#FFD173',
      events: []
    };

    field
      ?.filter(value => value.who === 'H')
      .forEach(value =>
        tempLineData.events.push({
          timeStart: value.time_start,
          timeEnd: value.time_end,
          textFrom: LINES_TEXT_ABBR[value.run_from],
          textTo: LINES_TEXT_ABBR[value.run_to]
        })
      );
    LINES_DATA.push(tempLineData);

    // Run lines calc

    if (bases.r1) {
      const tempLineData = {
        title: 'Run1',
        color: '#BF8610',
        secondaryColor: '#DFBA6F',
        events: []
      };

      field
        ?.filter(value => value.who === 'B1')
        .forEach(value =>
          tempLineData.events.push({
            timeStart: value.time_start,
            timeEnd: value.time_end,
            textFrom: LINES_TEXT_ABBR[value.run_from],
            textTo: LINES_TEXT_ABBR[value.run_to]
          })
        );
      LINES_DATA.push(tempLineData);
    }
    if (bases.r2) {
      const tempLineData = {
        title: 'Run2',
        color: '#8D6004',
        secondaryColor: '#C69736',
        events: []
      };

      field
        ?.filter(value => value.who === 'B2')
        .forEach(value =>
          tempLineData.events.push({
            timeStart: value.time_start,
            timeEnd: value.time_end,
            textFrom: LINES_TEXT_ABBR[value.run_from],
            textTo: LINES_TEXT_ABBR[value.run_to]
          })
        );
      LINES_DATA.push(tempLineData);
    }
    if (bases.r3) {
      const tempLineData = {
        title: 'Run3',
        color: '#5C4006',
        secondaryColor: '#AE9054',
        events: []
      };

      field
        ?.filter(value => value.who === 'B3')
        .forEach(value =>
          tempLineData.events.push({
            timeStart: value.time_start,
            timeEnd: value.time_end,
            textFrom: LINES_TEXT_ABBR[value.run_from],
            textTo: LINES_TEXT_ABBR[value.run_to]
          })
        );
      LINES_DATA.push(tempLineData);
    }
  }

  const handleTimelineEvtChanger = direction => () => {
    // Calc array for start times of events
    const { field, hit, pitch, play } = currentMoment.metering;

    const timesArr = [];
    field?.forEach(evt => timesArr.push(evt.time_start));
    play?.forEach(evt => timesArr.push(evt.time_start));
    pitch?.time_start && timesArr.push(pitch.time_start);
    hit?.time_start && timesArr.push(hit.time_start);

    const sortValue = direction === 'right' ? 1 : -1;
    const sortValue2 = sortValue * -1;
    timesArr.sort((a, b) => (a > b ? sortValue : sortValue2));

    if (direction === 'right') {
      const closestValue = timesArr.find(value => videoCurrentTime < value);
      closestValue > 0 && dispatch(setSeekValue(closestValue));
      return;
    }

    const closestValue = timesArr.find(value => videoCurrentTime > value + 0.2);
    closestValue > 0 && dispatch(setSeekValue(closestValue));
  };

  function handleKeyDown(e) {
    if (focus !== 'timeline') return;

    switch (e.key) {
      case 'ArrowLeft':
        dispatch(setSeekValue(videoCurrentTime - 1 / 30));
      case 'ArrowRight':
        dispatch(setSeekValue(videoCurrentTime + 1 / 30));
      default:
        break;
    }
  }

  let topShift = isMobileScoreboard ? 83.5 : 0;
  if (currentTab !== 'videos') topShift += (document.documentElement.clientWidth / 16) * 10;
  topShift += 'px';

  const wrapperClasses = classNames(cl.wrapper, {
    [addedClass]: !!addedClass,
    [cl.mobileDisplayNone]: !isMobileTimeline,
    [cl.mobileLandscapeDNone]: currentTab !== 'videos'
  });
  const rightEvtChangesClasses = classNames(cl.onlyMobile, cl.rightEvtChanger);
  return (
    <div className={wrapperClasses} onClick={useGameFocus('timeline')} style={{ '--top-shift': topShift }}>
      <div className={cl.eventsBtnsWrapper}>
        <TimelineEventChanger handleClick={handleTimelineEvtChanger} />
        <TimelineEventChanger direction='right' handleClick={handleTimelineEvtChanger} />
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
      <svg
        viewBox={`0 0 ${chartWidth} 52.5`}
        // viewBox={`0 0 ${VIEW_BOX_WIDTH} 52.5`}
        className={cl.chart}
        preserveAspectRatio='none'
        ref={chartRef}>
        {LINES_NUMBER > 0 && (
          <>
            {/* Draggable area */}
            {totalSeconds > 0 && (!isBroadcast || (isBroadcast && currentTab === 'videos')) && (
              <DraggableArea
                x1={sliderCoords.x1}
                x2={sliderCoords.x2}
                handleMouseDown={handleMouseDown}
                viewBoxWidth={chartWidth}
                totalSeconds={totalSeconds}
                videoLengthPrefix={videoLengthPrefix}
                SECONDS_SRC={SECONDS_SRC}
                currentTab={currentTab}
                forFullscreen={forFullscreen}
                ref={rectRef}
              />
            )}

            {/* Horizontal lines */}
            {totalSeconds > 0 && LINES_DATA.map(({ color, secondaryColor, events }, i) => (
              // Horizontal line
              <Fragment key={i}>
                <line
                  key={i}
                  x1='0'
                  y1={(i + 3) * 9 - Y_SHIFT}
                  x2={chartWidth}
                  y2={(i + 3) * 9 - Y_SHIFT}
                  stroke={color}
                  strokeWidth='0.5'
                />
                {/* Rects and texts */}
                {events.map(({ timeStart, timeEnd, textFrom, textTo }, j) => {
                  const xStart = getRelativeX(timeStart);
                  const yStart = (i + 3) * 9 - 4 - Y_SHIFT;
                  const xEnd = xStart + getRelativeX(timeEnd) - getRelativeX(timeStart);
                  const yEnd = yStart + 8;
                  const halfHeight = 8 / 2;
                  const cornerValue = 3;

                  const path = `M${xStart} ${yStart + halfHeight}L${xStart + cornerValue} ${yStart}L${
                    xEnd - cornerValue
                  } ${yStart}L${xEnd} ${yStart + halfHeight}L${xEnd - cornerValue} ${yEnd}L${
                    xStart + cornerValue
                  } ${yEnd}Z`;

                  return (
                    <Fragment key={j}>
                      <path d={path} fill={!(j % 2) ? color : secondaryColor} pointerEvents='none' />

                      {/* <rect
                      x={getRelativeX(timeStart)}
                      y={(i + 3) * 9 - 4 - Y_SHIFT}
                      fill={(j % 2) ? color : secondaryColor}
                      width={getRelativeX(timeEnd) - getRelativeX(timeStart)}
                      height='8'
                      className={cl.eventRect}
                    /> */}
                      <text
                        x={getRelativeX(timeStart) + (getRelativeX(timeEnd) - getRelativeX(timeStart)) / 2}
                        y={(i + 3) * 9 + 2.9 - Y_SHIFT}
                        className={cl.horizontalLineText}>
                        {textFrom}-{textTo}
                      </text>
                    </Fragment>
                  );
                })}
              </Fragment>
            ))}
            <use href={`#red-border-line${forFullscreen ? '-full' : ''}`} />
            <use href={`#red-border-line-white-text${forFullscreen ? '-full' : ''}`} />
            <use href={`#red-border-line-text${forFullscreen ? '-full' : ''}`} />
            <use href={`#left-border-line${forFullscreen ? '-full' : ''}`} />
            <use href={`#right-border-line${forFullscreen ? '-full' : ''}`} />
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
      <div className={rightEvtChangesClasses}>
        <TimelineEventChanger direction='right' handleClick={handleTimelineEvtChanger} />
      </div>
    </div>
  );
};

export default Timeline;
