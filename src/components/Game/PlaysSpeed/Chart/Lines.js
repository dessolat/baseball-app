import { plainText } from '../PlaysSpeed.module.scss';

const Lines = ({ coords }) => {
  const { maxYAxisValue, minYAxisValue, maxYCoord, minYCoord } = coords;

  const averageValue = (maxYAxisValue - minYAxisValue) / 3;
  const yAxisValues = [
    maxYAxisValue,
    maxYAxisValue - averageValue,
    minYAxisValue + averageValue,
    minYAxisValue
  ];

  const lineBtwAvg = (maxYCoord - minYCoord) / 3;
  return (
    <>
      {/* Horizontal lines text */}
      {[1, 1, 1, 1].map((_, i) => (
        <text key={i} x='0' y={minYCoord + lineBtwAvg * i + 5} className={plainText}>
          {yAxisValues[i]}
        </text>
      ))}

      {/* Horizontal lines */}
      {[1, 1, 1, 1].map((_, i) => (
        <line
          key={i}
          x1='30'
          y1={minYCoord + lineBtwAvg * i}
          x2='435'
          y2={minYCoord + lineBtwAvg * i}
          stroke='#E3E1E1'
          strokeWidth='1'
          strokeDasharray='4 2'
        />
      ))}
    </>
  );
};

export default Lines;
