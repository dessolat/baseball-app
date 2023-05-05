import cl from '../Banner.module.scss';
import classNames from 'classnames';
import { usePlayerStatsAnimationCtx } from 'context/PlayerStatsAnimationContext/PlayerStatsAnimationContext';

const SORT_PRIORITY = {
  '0-0': 1,
  '0-1': 2,
  '1-1': 3,
  '1-2': 4,
  '1-0': 5,
  '2-2': 6,
  '0-2': 7,
  '2-1': 8,
  '3-2': 9,
  '2-0': 10,
  '3-1': 11,
  '3-0': 12
};

const CountsDistributionItem = ({ item }) => {
  const [title, { swings, takes }] = item;

  const valueCoef = usePlayerStatsAnimationCtx();

  function getValues(value, sum) {
    const formattedValue = Number(((value * 100) / sum).toFixed(1));

    let animatedValue = '—';

    if (formattedValue !== '—') {
      animatedValue =
        valueCoef < 1 && formattedValue !== 0 ? (formattedValue * valueCoef).toFixed(1) : formattedValue;
      animatedValue += '%';
    }

    return { formattedValue, animatedValue };
  }

  const formattedTitle = `${title} (${swings} / ${takes})`;

  const itemClasses = classNames(cl.groupItem, cl.countsGroupItem);

  const { formattedValue: valueLeft, animatedValue: animatedValueLeft } = getValues(swings, swings + takes);
  const { formattedValue: valueRight } = getValues(takes, swings + takes);
  const animatedValueRight = valueRight > 0 ? `${Number(((100 - valueLeft) * valueCoef).toFixed(1))}%` : 0;
  return (
    <div className={itemClasses}>
      <div>{formattedTitle}</div>
      <div
        style={{
          background: `linear-gradient(to left, hsla(${169 + 0.41 * valueLeft * valueCoef}, 30%, ${
            88 - 0.15 * valueLeft * valueCoef
          }%, 1) ${valueLeft * valueCoef}%, transparent 0)`,
          textAlign: 'right',
          paddingRight: '.25rem',
          borderRight: '1px solid lightgray'
        }}>
        {animatedValueLeft}
      </div>
      <div
        style={{
          background: `linear-gradient(to right, hsla(${169 + 0.41 * valueRight * valueCoef}, 30%, ${
            88 - 0.15 * valueRight * valueCoef
          }%, 1) ${valueRight * valueCoef}%, transparent 0)`,
          paddingLeft: '.25rem'
        }}>
        {animatedValueRight}
      </div>
    </div>
  );
};

const CountsDistribution = ({ data, staticTitle }) => {
  const sortedList = Object.entries(data.CountsDistribution).sort((a, b) =>
    SORT_PRIORITY[a] > SORT_PRIORITY[b] ? -1 : 1
  );

  return (
    <div className={cl.group}>
      <p className={cl.title}>Swings/Takes by count distribution</p>
      {sortedList
        .filter(([_, { swings, takes }]) => swings > 0 || takes > 0)
        .map((item, i) => (
          <CountsDistributionItem key={i} item={item} staticTitle={staticTitle} />
        ))}
    </div>
  );
};

export default CountsDistribution;
