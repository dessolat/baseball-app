import { Fragment } from 'react';
import { graphColumn } from './FacedGraph.module.scss';
import { getPitchСlassColorByName, getPitchСlassPrimaryColorByName } from 'utils';

const Graph = ({ summary, PARAMS, minMaxSpeed, maxCount }) => {
  const minMaxSpeedDelta = Math.ceil(minMaxSpeed.max) - Math.floor(minMaxSpeed.min);
  const colWidth = (PARAMS.GRAPH_WIDTH / minMaxSpeedDelta) * 2;
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
                <Fragment key={`${i}-${j}`}>
                  <rect
                    x={xCoord}
                    y={yCoord}
                    width={colWidth}
                    height={colHeight}
                    fill={getPitchСlassColorByName(type)}
                    className={graphColumn}
                  />
                  <rect
                    x={xCoord}
                    y={yCoord}
                    width={colWidth}
                    height='18'
                    fill={getPitchСlassPrimaryColorByName(type)}
                    className={graphColumn}
                  />
                </Fragment>
              );
            })}
        </Fragment>
      ))}
    </>
  );
};

export default Graph;
