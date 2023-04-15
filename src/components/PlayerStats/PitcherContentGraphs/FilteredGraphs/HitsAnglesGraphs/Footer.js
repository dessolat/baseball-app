import { footerText } from './HitsAnglesGraph.module.scss';

const Footer = ({
  PARAMS: { GRAPH_WIDTH: graphWidth, GRAPH_HEIGHT: graphHeight },
  angleValues,
  footerField,
  footerUnits
}) => {
  const minMaxAvgValues = angleValues
    .filter(valueGroup => valueGroup[`min${footerField}`] !== undefined)
    .reduce(
      (sum, valueGroup) => {
        if (sum.min === undefined || valueGroup[`min${footerField}`] < sum.min)
          sum.min = valueGroup[`min${footerField}`];
        if (sum.max === undefined || valueGroup[`max${footerField}`] > sum.max)
          sum.max = valueGroup[`max${footerField}`];

        sum.sumValues += valueGroup[`sum${footerField}`];
        sum.sumHits += valueGroup.hitsCount;

        return sum;
      },
      { sumValues: 0, sumHits: 0 }
    );

  minMaxAvgValues.avg = minMaxAvgValues.sumValues / minMaxAvgValues.sumHits;

  // const minValue = `${Math.round(minMaxAvgValues.min * 10) / 10} ${footerUnits}`;
  const avgValue = `${Math.round(minMaxAvgValues.avg * 10) / 10} ${footerUnits}`;
  const maxValue = `${Math.round(minMaxAvgValues.max * 10) / 10} ${footerUnits}`;
  return (
    <text x={graphWidth / 2} y={graphHeight - 8} className={footerText}>
      AVG: {avgValue} MAX: {maxValue}
    </text>
  );
};

export default Footer;
