import { Fragment } from 'react';
import { getPitchСlassPrimaryColorByName } from 'utils';
import { footerValue } from './FacedGraph.module.scss';

const Footer = ({ totalClasses, PARAMS, data, pitchClasses }) => {
  const yCoord = PARAMS.PADDING_TOP + PARAMS.GRAPH_HEIGHT + 42;

  const minMaxSum = data.reduce((minMax, { pitch_info: { speed, pitch_type: pitchType } }) => {
    if (minMax[pitchClasses[pitchType]] === undefined) {
      minMax[pitchClasses[pitchType]] = { min: speed, max: speed, sum: speed, count: 1 };

      return minMax;
    }

		if (speed < minMax[pitchClasses[pitchType]].min) {
			minMax[pitchClasses[pitchType]].min = speed
		}
		if (speed > minMax[pitchClasses[pitchType]].max) {
			minMax[pitchClasses[pitchType]].max = speed
		}

		minMax[pitchClasses[pitchType]].sum += speed
		minMax[pitchClasses[pitchType]].count++

		return minMax
  }, {});

	console.log(minMaxSum);
  return (
    <>
      {totalClasses.map((classTitle, i) => {
        const xCoord = PARAMS.PADDING_LEFT + 135 + 207 * i;
				const avgValue = Math.round(minMaxSum[classTitle].sum / minMaxSum[classTitle].count)
        return (
          <Fragment key={i}>
            <rect
              x={xCoord}
              y={yCoord}
              width='6'
              height='6'
              fill={getPitchСlassPrimaryColorByName(classTitle)}
            />
            <text x={xCoord + 10} y={yCoord + 7} className={footerValue}>
              {classTitle} (Min:{minMaxSum[classTitle].min}, Avg:{avgValue}, Max:{minMaxSum[classTitle].max})
            </text>
          </Fragment>
        );
      })}
    </>
  );
};

export default Footer;
