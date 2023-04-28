import { AnimationContext } from 'context';
import { useContext } from 'react';
import cl from '../Banner.module.scss';

const PARAM_VOCABULARY = {
  Swing: 'Swings',
  Miss: 'Misses',
  Take: 'Takes',
  Hits: 'Base Hits',
  Fly: 'Flyes',
  Line: 'Lines',
	HitsInPlay: 'Hits In Play'
};

const CommonGroupItem = ({ item, parent, staticTitle }) => {
  const { par1, par2 } = item;

  const valueCoef = useContext(AnimationContext);

  if (par1 === null && par2 === null)
    return (
      <div className={cl.groupItem} style={{ background: 'unset' }}>
         
      </div>
    );

  const modifiedStaticTitle = par1 === 'GO' && par2 === 'FC' ? 'Outs' : staticTitle;

  const {
    abs: absValue,
    abs_rel: absRelValue,
    rel: value
  } = (par2 !== null ? parent[`${par1}/${par2}`] : parent[par1]) || {};

  let title = par2 !== null ? `${par1} & ${par2}` : par1;

  title = PARAM_VOCABULARY[par1] ?? title;

  title += ` (${absValue ?? '-'} / ${absRelValue ?? '-'} ${modifiedStaticTitle})`;

  const formattedValue = value !== '–' ? value : '—';

  let animatedValue = '—';

  if (formattedValue !== '—') {
    animatedValue =
      valueCoef < 1 && formattedValue !== 0
        ? (formattedValue * valueCoef).toFixed(1)
        : formattedValue ?? '- ';
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
      <p>{title}</p>
      <p>{animatedValue}</p>
    </div>
  );
};

const CommonGroup = ({ data, param, title, itemsArr, staticTitle }) => (
  <div className={cl.group}>
    <p className={cl.title}>{title}</p>
    {itemsArr.map((item, i) => (
      <CommonGroupItem key={i} item={item} parent={data[param]} staticTitle={staticTitle} />
    ))}
  </div>
);

export default CommonGroup;
