const Lines = ({ startX, startY }) => {
  return (
    <>
      {/* Horizontal lines */}
      <line
        x1={startX}
        y1={startY + 0}
        x2={startX + 100}
        y2={startY + 0}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
      <line
        x1={startX}
        y1={startY + 25}
        x2={startX + 100}
        y2={startY + 25}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
      <line
        x1={startX}
        y1={startY + 50}
        x2={startX + 100}
        y2={startY + 50}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
      <line
        x1={startX}
        y1={startY + 75}
        x2={startX + 100}
        y2={startY + 75}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
      <line
        x1={startX}
        y1={startY + 100}
        x2={startX + 100}
        y2={startY + 100}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />

      {/* Vertical lines */}
      <line
        x1={startX + 0}
        y1={startY}
        x2={startX + 0}
        y2={startY + 100}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
      <line
        x1={startX + 25}
        y1={startY}
        x2={startX + 25}
        y2={startY + 100}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
      <line
        x1={startX + 50}
        y1={startY}
        x2={startX + 50}
        y2={startY + 100}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
      <line
        x1={startX + 75}
        y1={startY}
        x2={startX + 75}
        y2={startY + 100}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
      <line
        x1={startX + 100}
        y1={startY}
        x2={startX + 100}
        y2={startY + 100}
        stroke='#E3E1E1'
        strokeDasharray='4 2'
      />
    </>
  );
};

export default Lines;
