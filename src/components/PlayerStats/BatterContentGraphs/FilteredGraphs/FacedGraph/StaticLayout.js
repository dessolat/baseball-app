const HorizontalRows = ({ PARAMS }) => {
  const rowsArr = new Array(PARAMS.ROWS_NUMBER + 1).fill('');
	const rowDelta = PARAMS.GRAPH_HEIGHT / PARAMS.ROWS_NUMBER

  return (
    <>
      {rowsArr.map((_, i) => (
        <line
          key={i}
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

const StaticLayout = ({ PARAMS }) => {
  return (
    <>
      <HorizontalRows PARAMS={PARAMS} />
    </>
  );
};

export default StaticLayout;
