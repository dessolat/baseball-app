import { useState } from 'react';
import OptionsToggler from 'components/UI/togglers/OptionsToggler/OptionsToggler';
import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import cl from './FieldGraph.module.scss';

const PARAMS = {
  GRAPH_WIDTH: 457,
  GRAPH_HEIGHT: 354.14,
  VERTICAL_COLUMNS_NUM: 8,
  HORIZONTAL_ROWS_NUM: 6
};

const VerticalGridLines = () => {
  const { GRAPH_WIDTH: graphWidth, GRAPH_HEIGHT: graphHeight, VERTICAL_COLUMNS_NUM: columnsNumber } = PARAMS;
  const columnWidth = graphWidth / columnsNumber;

  return (
    <>
      {new Array(columnsNumber + 1).fill(null).map((_, i, arr) => (
        <>
          <line
            key={'vert-' + i}
            x1={columnWidth * i}
            y1={0}
            x2={columnWidth * i}
            y2={graphHeight}
            stroke='#ACACAC'
            strokeDasharray={Math.floor(arr.length / 2) !== i ? '4 2' : null}
            // shapeRendering='crispEdges'
          />
          {i !== 0 && (
            <text x={columnWidth * i - 5} y={graphHeight - 7} className={cl.bottomTextTitle}>
              {i * 30 - 120}
            </text>
          )}
        </>
      ))}
    </>
  );
};

const HorizontalGridLines = () => {
  const { GRAPH_WIDTH: graphWidth, GRAPH_HEIGHT: graphHeight, HORIZONTAL_ROWS_NUM: rowsNumber } = PARAMS;
  const rowHeight = graphHeight / rowsNumber;

  return (
    <>
      {new Array(rowsNumber + 1).fill(null).map((_, i, arr) => (
        <>
          <line
            key={'hor-' + i}
            x1={0}
            y1={rowHeight * i}
            x2={graphWidth}
            y2={rowHeight * i}
            stroke='#ACACAC'
            strokeDasharray='4 2'
            // shapeRendering='crispEdges'
          />
          <text x='4' y={rowHeight * i + 15} className={cl.leftTextTitle}>
            {i * 30}
          </text>
        </>
      ))}
    </>
  );
};

const FieldGraph = ({ optionsArr, currentOption, setCurrentOption }) => {
  const [isChecked, setChecked] = useState(false);

  const optionsTogglerStyles = {
    position: 'absolute',
    right: '.4375rem',
    top: '.4375rem'
  };

  const handleOptionClick = option => () => setCurrentOption(option);
  const handleTogglerChange = () => setChecked(prev => !prev);
  return (
    <div className={cl.wrapper}>
      <svg
        viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'>
        <VerticalGridLines />
        <HorizontalGridLines />
      </svg>
      <OptionsToggler
        style={optionsTogglerStyles}
        optionsArr={optionsArr}
        currentOption={currentOption}
        handleOptionClick={handleOptionClick}
        vertical>
        <SimpleToggler checked={isChecked} onChange={handleTogglerChange} />
      </OptionsToggler>
    </div>
  );
};

export default FieldGraph;
