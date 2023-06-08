import Arrow from 'components/UI/buttons/Arrow/Arrow';
import BottomValues from './BottomValues';
import cl from './FacedGraph.module.scss';
import Footer from './Footer';
import Graph from './Graph';
import LeftValues from './LeftValues';
import StaticLayout from './StaticLayout';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import MobileFooter from './MobileFooter';

const PARAMS = {
  WRAPPER_WIDTH: 940,
  WRAPPER_HEIGHT: 365,
  GRAPH_WIDTH: 829,
  GRAPH_HEIGHT: 277,
  PADDING_LEFT: 63,
  PADDING_TOP: 27,
  ROWS_NUMBER: 4,
  COLS_NUMBER: 12
};

const PITCH_CLASSES_PRIORITY = {
  Fastball: 3,
  Breaking: 2,
  Offspeed: 1
};

const FacedGraph = ({ data, preview }) => {
  const { pitch_classes: pitchClasses } = preview;

  const [isLeftArrow, setIsLeftArrow] = useState(false);
  const [isRightArrow, setIsRightArrow] = useState(false);

  const innerWrapperRef = useRef(null);

  useEffect(() => {
    if (innerWrapperRef.current === null) return;

    setIsLeftArrow(innerWrapperRef.current.scrollLeft <= 0 ? false : true);
    setIsRightArrow(
      innerWrapperRef.current.scrollLeft + innerWrapperRef.current.clientWidth <
        innerWrapperRef.current.scrollWidth
        ? true
        : false
    );
  }, []);

  const minMaxSpeed = data.reduce((sum, { pitch_info: { speed } }) => {
    if (sum.min === undefined || speed < sum.min) sum.min = speed;
    if (sum.max === undefined || speed > sum.max) sum.max = speed;

    return sum;
  }, {});

  minMaxSpeed.min *= 2.24;
  minMaxSpeed.max *= 2.24;

  // Left and right speed corridor correction
  minMaxSpeed.min -= 14;
  minMaxSpeed.max += 14;

  let totalClasses = [];

  const summary = data.reduce((sum, { pitch_info: { speed, pitch_type: pitchType } }) => {
    totalClasses.push(pitchClasses[pitchType]);

    const colNumber = Math.floor((Math.floor(speed * 2.24) - Math.floor(minMaxSpeed.min)) / 2);
    if (sum[colNumber] === undefined) {
      sum[colNumber] = { [pitchClasses[pitchType]]: 1 };

      return sum;
    }

    if (sum[colNumber][pitchClasses[pitchType]] === undefined) {
      sum[colNumber][pitchClasses[pitchType]] = 1;

      return sum;
    }

    sum[colNumber][pitchClasses[pitchType]]++;

    return sum;
  }, {});

  totalClasses = Array.from(new Set(totalClasses)).sort((a, b) =>
    PITCH_CLASSES_PRIORITY[a] > PITCH_CLASSES_PRIORITY[b] ? -1 : 1
  );

  const maxCount = Object.values(summary).reduce((max, col) => {
    Object.values(col).forEach(value => {
      if (value > max) max = value;
    });

    return max;
  }, 0);

  const horizontalScrollHandler = e => {
    setIsLeftArrow(e.target.scrollLeft <= 0 ? false : true);
    setIsRightArrow(e.target.scrollLeft + e.target.clientWidth < e.target.scrollWidth ? true : false);
  };

  const leftArrowClasses = classNames(cl.arrowBtn, cl.leftArrowBtn);
  const rightArrowClasses = classNames(cl.arrowBtn, cl.rightArrowBtn);
  return (
    <div className={cl.wrapper}>
      {isLeftArrow && <Arrow direction='left' className={leftArrowClasses} />}
      <div className={cl.innerWrapper} onScroll={horizontalScrollHandler} ref={innerWrapperRef}>
        <svg
          viewBox={`0 0 ${PARAMS.WRAPPER_WIDTH} ${PARAMS.WRAPPER_HEIGHT}`}
          width='100%'
          fill='none'
          className={cl.graph}
          xmlns='http://www.w3.org/2000/svg'>
          {/* Layout */}
          <StaticLayout PARAMS={PARAMS} />

          {/* Bottom values */}
          {maxCount > 0 && <BottomValues minMaxSpeed={minMaxSpeed} PARAMS={PARAMS} />}

          {/* Left values */}
          <LeftValues maxCount={maxCount} PARAMS={PARAMS} />

          {/* Graph */}
          <Graph summary={summary} PARAMS={PARAMS} minMaxSpeed={minMaxSpeed} maxCount={maxCount} />

          {/* Footer */}
          <Footer totalClasses={totalClasses} PARAMS={PARAMS} data={data} pitchClasses={pitchClasses} />
        </svg>
      </div>
      {isRightArrow && <Arrow direction='right' className={rightArrowClasses} />}
      {/* Mobile Footer */}
      <MobileFooter totalClasses={totalClasses} PARAMS={PARAMS} data={data} pitchClasses={pitchClasses} />
    </div>
  );
};

export default FacedGraph;
