import cl from '../Banner.module.scss';
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

const CountsDistributionItem = ({ item, staticTitle }) => {
  const [title, { abs: absValue, abs_rel: absRelValue, rel: value }] = item;

  const valueCoef = usePlayerStatsAnimationCtx();

  const formattedTitle = `${title} (${absValue} / ${absRelValue} ${staticTitle})`;
  const formattedValue = value !== '–' ? value : '—';

  let animatedValue = '—';

  if (formattedValue !== '—') {
    animatedValue =
      valueCoef < 1 && formattedValue !== 0 ? (formattedValue * valueCoef).toFixed(1) : formattedValue;
    animatedValue += '%';
  }

  return (
    <div
      className={cl.groupItem}
      style={{
        background: `linear-gradient(to left, hsla(${169 + 0.41 * formattedValue * valueCoef}, 30%, ${
          88 - 0.15 * formattedValue * valueCoef
        }%, 1) ${formattedValue * valueCoef}%, rgba(234, 234, 234, 0.4) 0)`
      }}>
      <p>{formattedTitle}</p>
      <p>{animatedValue}</p>
    </div>
  );
};

const CountsDistribution = ({ data, staticTitle }) => {
  const sortedList = JSON.parse(JSON.stringify(Object.entries(data.CountsDistribution))).sort((a, b) =>
    SORT_PRIORITY[a] > SORT_PRIORITY[b] ? -1 : 1
  );

  return (
    <div className={cl.group}>
      <p className={cl.title}>Counts distribution</p>
      {sortedList.map((item, i) => (
        <CountsDistributionItem key={i} item={item} staticTitle={staticTitle} />
      ))}
    </div>
  );
};

export default CountsDistribution;
