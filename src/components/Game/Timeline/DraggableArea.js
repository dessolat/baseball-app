import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import cl from './Timeline.module.scss';

const DraggableArea = (
  { x1, x2, handleMouseDown, viewBoxWidth, totalSeconds, SECONDS_SRC, currentTab, forFullscreen },
  ref
) => {
  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);
  const currentMoment = useSelector(state => state.game.currentMoment);
  // const sliderCoords = useSelector(state => state.game.timelineSliderCoords);

  const x1relative = (viewBoxWidth / 100) * x1;
  const x2relative = (viewBoxWidth / 100) * x2;
  // const x1relative = paddings + ((viewBoxWidth - paddings) / 100) * x1;
  // const x2relative = ((viewBoxWidth - paddings) / 100) * x2;

  const leftLineTotalSecs = (totalSeconds / 100) * x1;
  const leftLineMins = Math.floor(leftLineTotalSecs / 60);
  const leftLineSecs = (leftLineTotalSecs - leftLineMins * 60).toFixed(0);
  const leftLineTime = `${leftLineMins}:${leftLineSecs.length === 1 ? 0 : ''}${leftLineSecs}`;

  const rightLineTotalSecs = (totalSeconds / 100) * x2;
  const rightLineMins = Math.floor(rightLineTotalSecs / 60);
  const rightLineSecs = (rightLineTotalSecs - rightLineMins * 60).toFixed(0);
  const rightLineTime = `${rightLineMins}:${rightLineSecs.length === 1 ? 0 : ''}${rightLineSecs}`;

  const redLineTotalSecs = videoCurrentTime - (SECONDS_SRC[currentTab].timeStart ?? 0);
  // const redLineTotalSecs = videoCurrentTime - (currentMoment.video[`${videoLengthPrefix}_seconds_from`] ?? 0);
  // const redLineTotalSecs = videoCurrentTime - (currentMoment.video?.seconds_from ?? 0);
  const redLineMins = Math.floor(redLineTotalSecs / 60);
  const redLineSecs = (redLineTotalSecs - redLineMins * 60).toFixed(0);
  const redLineTime = `${redLineMins}:${redLineSecs.length === 1 ? 0 : ''}${redLineSecs}`;

  const redLinePercent = (redLineTotalSecs * 100) / totalSeconds;

  const isRedLineMoreX2 = (viewBoxWidth / 100) * redLinePercent > x2relative;
  const redLineRelative = isRedLineMoreX2 ? x2relative : (viewBoxWidth / 100) * redLinePercent;
  return (
    <>
      {/* Draggable field */}
      <rect
        x={x1relative}
        y='0'
        width={x2relative - x1relative}
        height='52'
        fill='#E0F0FF'
        fillOpacity='0.4'
        className={cl.draggableRect}
        onMouseDown={handleMouseDown}
        onDragStart={e => e.preventDefault()}
        name='drag-area'
        ref={ref}
      />
      {/* Red line */}
      <line
        x1={redLineRelative - 1}
        y1='0'
        x2={redLineRelative - 1}
        y2='52'
        stroke='transparent'
        strokeWidth='20'
        className={cl.draggableLine}
        onMouseDown={handleMouseDown}
        onDragStart={e => e.preventDefault()}
        name='red-line'
      />
      <line
        x1={redLineRelative + 1}
        y1='0'
        x2={redLineRelative + 1}
        y2='52'
        id={`red-border-line${forFullscreen ? '-full' : ''}`}
        stroke='#E2001C'
        strokeWidth='2'
        className={cl.redLine + ' ' + cl.siblingLine}
        onDragStart={e => e.preventDefault()}
      />
      <text
        x={redLinePercent < 96 ? redLineRelative + 5 : redLineRelative - 25}
        y='49'
        className={cl.redLineText}>
        {redLineTime}
      </text>

      {/* Left line */}
      <line
        x1={x1relative + 1}
        y1='0'
        x2={x1relative + 1}
        y2='52'
        stroke='transparent'
        strokeWidth='25'
        className={cl.draggableLine}
        onMouseDown={handleMouseDown}
        onDragStart={e => e.preventDefault()}
        name='left-line'
      />
      <line
        x1={x1relative + 1}
        y1='0'
        x2={x1relative + 1}
        y2='52'
        id={`left-border-line${forFullscreen ? '-full' : ''}`}
        stroke='#1A4C96'
        strokeWidth='2'
        className={cl.siblingLine}
        onDragStart={e => e.preventDefault()}
      />
      <text x={x1relative + 5} y='49' className={cl.verticalLineText}>
        {leftLineTime}
      </text>

      {/* Right line */}
      <line
        x1={x2relative - 1}
        y1='0'
        x2={x2relative - 1}
        y2='52'
        stroke='transparent'
        strokeWidth='25'
        className={cl.draggableLine}
        onMouseDown={handleMouseDown}
        onDragStart={e => e.preventDefault()}
        name='right-line'
      />
      <line
        x1={x2relative - 1}
        y1='0'
        x2={x2relative - 1}
        y2='52'
        id={`right-border-line${forFullscreen ? '-full' : ''}`}
        stroke='#1A4C96'
        strokeWidth='2'
        className={cl.siblingLine}
        onDragStart={e => e.preventDefault()}
      />
      <text x={x2 < 96 ? x2relative + 5 : x2relative - 25} y='49' className={cl.verticalLineText}>
        {rightLineTime}
      </text>
    </>
  );
};

export default forwardRef(DraggableArea);
