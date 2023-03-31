import { graphTitle } from '../PlaysSpin.module.scss';

const LinesText = ({ startX, startY, graphRatio, minMaxValues }) => {
  const maxY = Math.ceil(minMaxValues.maxY * 100);
  const minY = Math.floor(minMaxValues.minY * 100);
  const maxX = Math.ceil(minMaxValues.maxX * 100);
  const minX = Math.floor(minMaxValues.minX * 100);

  const averageY = (maxY - minY) / 4;
  const averageX = (maxX - minX) / 4;
  return (
    <>
      {/* Horizontal lines text */}
      <text x={startX - 15} y='15' stroke='black' textAnchor='middle' className={graphTitle}>
        {(maxY / graphRatio) * -1}
      </text>
      <text x={startX - 15} y='40' stroke='black' textAnchor='middle' className={graphTitle}>
        {Math.round(((maxY - averageY) / graphRatio) * -1)}
      </text>
      <text x={startX - 15} y='65' stroke='black' textAnchor='middle' className={graphTitle}>
        {Math.round(((maxY + minY) / 2 / graphRatio) * -1)}
      </text>
      <text x={startX - 15} y='90' stroke='black' textAnchor='middle' className={graphTitle}>
        {Math.round(((minY + averageY) / graphRatio) * -1)}
      </text>
      <text x={startX - 15} y='115' stroke='black' textAnchor='middle' className={graphTitle}>
        {(minY / graphRatio) * -1}
      </text>

      {/* Vertical lines text */}
      <text x={startX + 0} y={startY + 117} stroke='black' textAnchor='middle' className={graphTitle}>
        {minX / graphRatio}
      </text>
      <text x={startX + 25} y={startY + 117} stroke='black' textAnchor='middle' className={graphTitle}>
        {Math.round((minX + averageX) / graphRatio)}
      </text>
      <text x={startX + 50} y={startY + 117} stroke='black' textAnchor='middle' className={graphTitle}>
        {Math.round((maxX + minX) / 2 / graphRatio)}
      </text>
      <text x={startX + 75} y={startY + 117} stroke='black' textAnchor='middle' className={graphTitle}>
        {Math.round((maxX - averageX) / graphRatio)}
      </text>
      <text x={startX + 100} y={startY + 117} stroke='black' textAnchor='middle' className={graphTitle}>
        {maxX / graphRatio}
      </text>
    </>
  );
};

export default LinesText;
