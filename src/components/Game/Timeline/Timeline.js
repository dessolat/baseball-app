import React, { Fragment, useRef, useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DraggableArea from './DraggableArea';
import cl from './Timeline.module.scss';

const LINES = [
  { color: '#1A4C96', leftTitle: 'Ball' },
  { color: '#FFAB00', leftTitle: 'Hitter' },
  { color: '#BF8610', leftTitle: 'Run1' },
  { color: '#8D6004', leftTitle: 'Run2' },
  { color: '#5C4006', leftTitle: 'Run3' }
];

const VIEW_BOX_WIDTH = 825;
// const VIEW_BOX_WIDTH = 885;
// const SIDE_PADDINGS = 30;

const Timeline = ({ addedClass = null }) => {
  const [sliderCoords, setSliderCoords] = useState({ x1: 30, x2: 65 });

  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);
  const currentMoment = useSelector(state => state.game.currentMoment);

  const sliderRef = useRef();
  const sliderNameRef = useRef();
  const mouseDownXCoordRef = useRef();
  const mouseDownStateRef = useRef();
  const rectRef = useRef();

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      setSliderCoords(prev => ({
        ...prev,
        x1: prev.x2 - 5 > currentCoordPercents ? currentCoordPercents : prev.x2 - 5
      }));
      return;
    }
    if (sliderNameRef.current === 'right-line') {
      setSliderCoords(prev => ({
        ...prev,
        x2: prev.x1 + 5 < currentCoordPercents ? currentCoordPercents : prev.x1 + 5
      }));
      return;
    }

    if (sliderNameRef.current === 'drag-area') {
      const slider = sliderRef.current;
      const parent = slider.parentElement;

      const percentRatio = parent.getBoundingClientRect().width / 100;
      const pixelsDelta = e.clientX - mouseDownXCoordRef.current;
      const percentsDelta = +(pixelsDelta / percentRatio).toFixed(4);

      setSliderCoords(prev => {
        let tempX1 = prev.x1;
        let tempX2 = prev.x2;

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
      });

      return;
    }
  }

  const handleMouseUp = () => {
    sliderRef.current.parentElement.style.cursor = 'default';
    if (sliderNameRef.current.includes('line')) rectRef.current.style.cursor = 'grab';

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = e => {
    sliderRef.current = e.target;
    sliderNameRef.current = e.target.attributes.name.value;
    mouseDownXCoordRef.current = e.clientX;
    mouseDownStateRef.current = JSON.parse(JSON.stringify(sliderCoords));

    sliderRef.current.parentElement.style.cursor = 'e-resize';
    if (sliderNameRef.current.includes('line')) rectRef.current.style.cursor = 'e-resize';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const totalSeconds = currentMoment.video
    ? currentMoment.video.seconds_to - currentMoment.video.seconds_from
    : 0;
  const minutesSide = Math.floor(totalSeconds / 60);
	const secondsSide = (totalSeconds - minutesSide * 60).toFixed(0)
  const rightTitle = `${minutesSide}:${secondsSide.length === 1 ? 0 : ''}${secondsSide}`
  return (
    <div className={cl.wrapper + ' ' + addedClass}>
      <svg viewBox={`0 0 30 52`} className={cl.sideChart} preserveAspectRatio='none'>
        {/* Left titles */}
        {LINES.map(({ leftTitle }, i) => (
          <text x='2' y={(i + 1) * 9 + 3} className={cl.leftTitle}>
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
            y1={(i + 1) * 9}
            x2={VIEW_BOX_WIDTH}
            y2={(i + 1) * 9}
            stroke={color}
            strokeWidth='1'
          />
        ))}

        {/* Lines text */}
        {LINES.map((_, i) => (
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
        ))}

        {/* Draggable area */}
        <DraggableArea
          x1={sliderCoords.x1}
          x2={sliderCoords.x2}
          handleMouseDown={handleMouseDown}
          viewBoxWidth={VIEW_BOX_WIDTH}
					totalSeconds={totalSeconds}
          ref={rectRef}
        />
      </svg>
      {/* // currentMoment.video?.seconds_from */}

      <svg viewBox={`0 0 30 52`} className={cl.sideChart} preserveAspectRatio='none'>
        <text x='4' y='30' className={cl.rightTitle}>
          {rightTitle}
        </text>
      </svg>
    </div>
  );
};

export default Timeline;
