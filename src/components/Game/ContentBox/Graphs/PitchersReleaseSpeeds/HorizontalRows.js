const HorizontalRows = ({ PARAMS }) => {
  const rowsArr = new Array(PARAMS.ROWS_NUMBER).fill(null);
  const rowsDelta = PARAMS.GRAPH_HEIGHT / (PARAMS.ROWS_NUMBER - 1);

  return (
    <>
      {rowsArr.map((_, i) => (
        <line
          key={`horizontal-row-${i}`}
          x1={PARAMS.LEFT_PADDING}
          x2={PARAMS.LEFT_PADDING + PARAMS.GRAPH_WIDTH}
          y1={PARAMS.TOP_PADDING + rowsDelta * i}
          y2={PARAMS.TOP_PADDING + rowsDelta * i}
          stroke='#E3E1E1'
          strokeDasharray='4 2'
        />
      ))}
    </>
  );
};

export default HorizontalRows;
