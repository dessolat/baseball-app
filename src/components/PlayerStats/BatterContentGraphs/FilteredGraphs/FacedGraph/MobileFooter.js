import { Fragment } from 'react';
import { getPitchСlassPrimaryColorByName } from 'utils';
import { footerValue } from './FacedGraph.module.scss';
import cl from './FacedGraph.module.scss';

const MobileFooter = ({ totalClasses, PARAMS, data, pitchClasses }) => {
  const minMaxSum = data.reduce((minMax, { pitch_info: { speed, pitch_type: pitchType } }) => {
    if (minMax[pitchClasses[pitchType]] === undefined) {
      minMax[pitchClasses[pitchType]] = { min: speed, max: speed, sum: speed, count: 1 };

      return minMax;
    }

    if (speed < minMax[pitchClasses[pitchType]].min) {
      minMax[pitchClasses[pitchType]].min = speed;
    }
    if (speed > minMax[pitchClasses[pitchType]].max) {
      minMax[pitchClasses[pitchType]].max = speed;
    }

    minMax[pitchClasses[pitchType]].sum += speed;
    minMax[pitchClasses[pitchType]].count++;

    return minMax;
  }, {});

  return (
    <div className={cl.mobileFooterWrapper}>
      {totalClasses
        .filter(classTitle => classTitle !== '')
        .map((classTitle, i) => {
          const xCoord = PARAMS.PADDING_LEFT + 135;
          const yCoord = PARAMS.PADDING_TOP + PARAMS.GRAPH_HEIGHT + 42 + i * 35;
          const minValue = Math.round(minMaxSum[classTitle].min * 2.24);
          const avgValue = Math.round((minMaxSum[classTitle].sum / minMaxSum[classTitle].count) * 2.24);
          const maxValue = Math.round(minMaxSum[classTitle].max * 2.24);
          return (
            <Fragment key={i}>
							<div style={{position: 'absolute', left: 30}}></div>
              <rect
                x={xCoord}
                y={yCoord}
                width='6'
                height='6'
                fill={getPitchСlassPrimaryColorByName(classTitle)}
              />
              <text x={xCoord + 10} y={yCoord + 7} className={footerValue}>
                {classTitle} (Min:{minValue}, Avg:{avgValue}, Max:{maxValue})
              </text>
            </Fragment>
          );
        })}
    </div>
  );
};

export default MobileFooter;
