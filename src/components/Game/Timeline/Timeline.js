import React, { Fragment, useRef, useEffect } from 'react';
import { useState } from 'react';
import DraggableArea from './DraggableArea';
import cl from './Timeline.module.scss';

const LINES = [
  { color: '#1A4C96' },
  { color: '#FFAB00' },
  { color: '#BF8610' },
  { color: '#8D6004' },
  { color: '#5C4006' }
];

const VIEW_BOX_WIDTH = 885;

const Timeline = () => {
  const [sliderCoords, setSliderCoords] = useState({ x1: 30, x2: 65 });

  const sliderRef = useRef();
  const sliderNameRef = useRef();
  const mouseDownXCoordRef = useRef();
  const mouseDownStateRef = useRef();

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
    // let currentCoord =   e.clientX - parent.getBoundingClientRect().left - 3.5;

    // if (e.clientX < parent.getBoundingClientRect().left) currentCoord = 0;
    // if (e.clientX - parent.getBoundingClientRect().left < 0) currentCoord = -3.5;
    // if (e.clientX > parent.getBoundingClientRect().right) currentCoord = parent.offsetWidth;
    // if (e.clientX > parent.getBoundingClientRect().right) currentCoord = parent.offsetWidth - 3.5;

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
          // tempX1 = 0;
          // tempX2 = prev.x2 - prev.x1;

          return { x1: tempX1, x2: tempX2 };
        }

        if (mouseDownStateRef.current.x2 + percentsDelta > 100) {
          tempX1 = mouseDownStateRef.current.x1 + (100 - mouseDownStateRef.current.x2);
          tempX2 = 100;

          return { x1: tempX1, x2: tempX2 };
        }

        return { x1: mouseDownStateRef.current.x1 + percentsDelta, x2: mouseDownStateRef.current.x2 + percentsDelta };
        // return { x1: prev.x1 + percentsDelta, x2: prev.x2 + percentsDelta };
      });

      // mouseDownXCoordRef.current += pixelsDelta;
      return;
    }
    // console.log(e.clientX);
    // console.log(slider);
    // console.log(parent);
    // console.log(parent.getBoundingClientRect().width);
    // slider.style.left = currentCoord + 'px';
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = e => {
    sliderRef.current = e.target;
    sliderNameRef.current = e.target.attributes.name.value;
    mouseDownXCoordRef.current = e.clientX;
    mouseDownStateRef.current = JSON.parse(JSON.stringify(sliderCoords));

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // const ppu =
  return (
    <div className={cl.wrapper}>
      <svg viewBox={`0 0 ${VIEW_BOX_WIDTH} 52`} className={cl.chart} preserveAspectRatio='none'>
        {/* Horizontal lines */}
        {LINES.map(({ color }, i) => (
          <line key={i} x1='0' y1={(i + 1) * 9} x2='885' y2={(i + 1) * 9} stroke={color} strokeWidth='1' />
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
        />
      </svg>
    </div>
  );
};

export default Timeline;
