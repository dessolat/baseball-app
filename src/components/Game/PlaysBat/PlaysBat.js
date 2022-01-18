import React, { useState, useEffect, useRef } from 'react';
import cl from './PlaysBat.module.scss';
import PlaysBatFooter from './PlaysBatFooter';
import PlaysBatHeader from './PlaysBatHeader';
import PlaysBatMedia from './PlaysBatMedia';

const PlaysBat = ({ currentMoment }) => {
  const { metering, events } = currentMoment;
  const { data_2d, swing_index, plane_index, impact_index } = metering?.bat || {};

  const [currentLine, setCurrentLine] = useState('');
  const [curvePath, setCurvePath] = useState('');
  const [linesPaths, setLinesPaths] = useState(['', '', '']);
  const [frame, setFrame] = useState(0);

  const maxFrameRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
		
    if (Object.keys(currentMoment).length === 0 || !data_2d) {
      setCurvePath('');
      setLinesPaths(['', '', '']);
      return;
    }
    maxFrameRef.current = data_2d.length;
    setFrame(1);
    setLinesPaths(['', '', '']);
  }, [currentMoment, data_2d, events]);

  useEffect(() => {
    if (frame === 0 || !data_2d) return;

    const xShift = -450;
    const yShift = -200;

    if (frame > maxFrameRef.current) {
      maxFrameRef.current = null;
      const coord0 = data_2d[swing_index];
      const coord1 = data_2d[plane_index];
      const coord2 = data_2d[impact_index];
      const line0 = `M${coord0.up[0] + xShift} ${coord0.up[1] + yShift}L${coord0.bottom[0] + xShift} ${
        coord0.bottom[1] + yShift
      }`;
      const line1 = `M${coord1.up[0] + xShift} ${coord1.up[1] + yShift}L${coord1.bottom[0] + xShift} ${
        coord1.bottom[1] + yShift
      }`;
      const line2 = `M${coord2.up[0] + xShift} ${coord2.up[1] + yShift}L${coord2.bottom[0] + xShift} ${
        coord2.bottom[1] + yShift
      }`;
      setLinesPaths([line0, line1, line2]);
      return;
    }

    let newCurve = '';
    const slicedArr = data_2d.slice(0, frame);

    slicedArr.forEach(
      (coord, i) =>
        (newCurve +=
          i === 0
            ? `M${coord.up[0] + xShift} ${coord.up[1] + yShift}`
            : `L${coord.up[0] + xShift} ${coord.up[1] + yShift}`)
    );

    let backPath = '';
    slicedArr
      .reverse()
      .forEach(coord => (backPath += `L${coord.bottom[0] + xShift} ${coord.bottom[1] + yShift}`));
    newCurve += backPath + 'Z';
    setCurvePath(newCurve);

    timeoutRef.current = setTimeout(() => setFrame(prev => prev + 1), 10);
		// eslint-disable-next-line
  }, [frame]);

  const handleDotClick = str => () => setCurrentLine(str);

  return (
    <div className={cl.bat}>
      <PlaysBatHeader bat={currentMoment.metering?.bat} />
      <PlaysBatMedia
        metering={metering}
        curvePath={curvePath}
        linesPaths={linesPaths}
        currentLine={currentLine}
      />
      <PlaysBatFooter
        currentLine={currentLine}
        currentMoment={currentMoment}
        handleDotClick={handleDotClick}
				frame={frame}
      />
    </div>
  );
};

export default PlaysBat;
