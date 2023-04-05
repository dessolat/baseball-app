import { showingGroup } from './FieldGraph.module.scss';

const Tooltip = ({ hoveredDot }) => {
  const spinValueX = Math.round(hoveredDot.spinX);
  const spinValueY = Math.round(hoveredDot.spinY);

  const hoveredDotXCoord = hoveredDot.coords[0] <= 300 ? hoveredDot.coords[0] : hoveredDot.coords[0] - 65;
  const hoveredDotYCoord = hoveredDot.coords[1] > 50 ? hoveredDot.coords[1] : hoveredDot.coords[1] + 75;
  return (
    <g className={showingGroup}>
      <rect
        x={hoveredDotXCoord - 51}
        y={hoveredDotYCoord - 50}
        width={102}
        height={35}
        stroke='grey'
        strokeWidth='.5'
        fill='white'
        radius='10'
      />
      <text x={hoveredDotXCoord} y={hoveredDotYCoord - 35} textAnchor='middle'>
        {hoveredDot.pitchType}
      </text>
      <text x={hoveredDotXCoord} y={hoveredDotYCoord - 19} textAnchor='middle'>
        x: {spinValueX} y: {spinValueY}
      </text>
    </g>
  );
};

export default Tooltip;
