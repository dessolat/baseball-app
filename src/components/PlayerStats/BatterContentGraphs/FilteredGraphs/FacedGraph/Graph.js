import { Fragment } from 'react';
import { graphColumn } from './FacedGraph.module.scss';
import { getPitchСlassColorByName } from 'utils';

const Graph = ({ summary, PARAMS, minMaxSpeed, maxCount }) => {
  const minMaxSpeedDelta = Math.ceil(minMaxSpeed.max) - Math.floor(minMaxSpeed.min);
  const colWidth = PARAMS.GRAPH_WIDTH / minMaxSpeedDelta;
  const heightPerHit = PARAMS.GRAPH_HEIGHT / maxCount;

  return (
    <>
      {Object.entries(summary).map(([colNumber, valuesByTypes], i) => (
        <Fragment key={i}>
          {Object.entries(valuesByTypes)
            .sort((a, b) => (a[1] > b[1] ? -1 : 1))
            .map(([type, value], j) => {
              const colHeight = heightPerHit * value;
              const xCoord = PARAMS.PADDING_LEFT + colWidth * colNumber;
              const yCoord = PARAMS.PADDING_TOP + PARAMS.GRAPH_HEIGHT - colHeight;

              return (
                <rect
                  key={`${i}-${j}`}
                  x={xCoord}
                  y={yCoord}
                  width={colWidth}
                  height={colHeight}
                  fill={getPitchСlassColorByName(type)}
                  className={graphColumn}
                />
              );
            })}
        </Fragment>
      ))}
    </>
  );
};

export default Graph;
