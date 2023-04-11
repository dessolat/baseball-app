import { Fragment } from 'react';
import { getPitchСlassPrimaryColorByName } from 'utils';
import { footerValue } from './FacedGraph.module.scss';

const Footer = ({ totalClasses, PARAMS }) => {
  const yCoord = PARAMS.PADDING_TOP + PARAMS.GRAPH_HEIGHT + 42;

  return (
    <>
      {totalClasses.map((classTitle, i) => {
        const xCoord = PARAMS.PADDING_LEFT + 135 + 207 * i;

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
              {classTitle}
            </text>
          </Fragment>
        );
      })}
    </>
  );
};

export default Footer;
