import { leftTitle, bottomTitle } from './FacedGraph.module.scss';

const HorizontalLines = ({ PARAMS }) => {
  const linesArr = new Array(PARAMS.ROWS_NUMBER + 1).fill('');
  const rowDelta = PARAMS.GRAPH_HEIGHT / PARAMS.ROWS_NUMBER;

  return (
    <>
      {linesArr.map((_, i) => (
        <line
          key={'hor-line-' + i}
          x1={PARAMS.PADDING_LEFT}
          y1={PARAMS.PADDING_TOP + i * rowDelta}
          x2={PARAMS.PADDING_LEFT + PARAMS.GRAPH_WIDTH}
          y2={PARAMS.PADDING_TOP + i * rowDelta}
          stroke='#ACACAC'
          strokeDasharray='4 2'
        />
      ))}
    </>
  );
};

const VerticalLines = ({ PARAMS }) => {
  const linesArr = new Array(PARAMS.COLS_NUMBER + 1).fill('');
  const colDelta = PARAMS.GRAPH_WIDTH / PARAMS.COLS_NUMBER;

  return (
    <>
      {linesArr.map((_, i) => (
        <line
          key={'vert-line-' + i}
          x1={PARAMS.PADDING_LEFT + i * colDelta}
          y1={PARAMS.PADDING_TOP}
          x2={PARAMS.PADDING_LEFT + i * colDelta}
          y2={PARAMS.PADDING_TOP + PARAMS.GRAPH_HEIGHT}
          stroke='#ACACAC'
          strokeDasharray='4 2'
        />
      ))}
    </>
  );
};

const Titles = ({ PARAMS }) => {
  const leftTitleCoords = { x: PARAMS.PADDING_LEFT - 40, y: PARAMS.PADDING_TOP + PARAMS.GRAPH_HEIGHT + 15 };
  const bottomTitleCoords = { x: PARAMS.PADDING_LEFT - 1, y: PARAMS.PADDING_TOP + PARAMS.GRAPH_HEIGHT + 34 };
  return (
    <>
      {/* Left title */}
      <text x={leftTitleCoords.x} y={leftTitleCoords.y} className={leftTitle}>
        Pitches
      </text>

      {/* Bottom title */}
      <text x={bottomTitleCoords.x} y={bottomTitleCoords.y + 15} className={bottomTitle}>
        Speed, mph
      </text>
    </>
  );
};

const StaticLayout = ({ PARAMS }) => {
  return (
    <>
      <HorizontalLines PARAMS={PARAMS} />
      <VerticalLines PARAMS={PARAMS} />
      <Titles PARAMS={PARAMS} />
    </>
  );
};

export default StaticLayout;
