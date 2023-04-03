import { showingGroup } from './TwinPitchesGraph.module.scss';

const Tooltip = ({ hoveredDot, isType = true }) => {
  const speedValue = +hoveredDot.speed.toFixed(2) + ' mph';

  const hoveredDotXCoord =
    hoveredDot.coords[0] <= 75
      ? hoveredDot.coords[0] + 80
      : hoveredDot.coords[0] <= 315
      ? hoveredDot.coords[0]
      : hoveredDot.coords[0] - 65;
  const hoveredDotYCoord = hoveredDot.coords[1] > 50 ? hoveredDot.coords[1] : hoveredDot.coords[1] + 75;
  let rectY = hoveredDotYCoord - 50;
  let rectHeight = 35;
  const rectWidth = 138;
  const rectX = hoveredDotXCoord - rectWidth / 2;

  if (!isType) {
    rectY += 16;
    rectHeight -= 16;
  }
  return (
    <g className={showingGroup}>
      <rect
        x={rectX}
        y={rectY}
        width={rectWidth}
        height={rectHeight}
        stroke='grey'
        strokeWidth='.5'
        fill='white'
        radius='10'
      />
      {isType && (
        <text x={hoveredDotXCoord} y={hoveredDotYCoord - 35} textAnchor='middle'>
          {hoveredDot.pitchType}
        </text>
      )}
      <text x={hoveredDotXCoord} y={hoveredDotYCoord - 19} textAnchor='middle'>
        Speed: {speedValue}
      </text>
    </g>
  );
};

export default Tooltip;
