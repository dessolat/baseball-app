import classNames from 'classnames';
import cl from '../Banner.module.scss';
import { usePlayerStatsAnimationCtx } from 'context/PlayerStatsAnimationContext/PlayerStatsAnimationContext';

const TotalInfoItem = ({ item, parent }) => {
  const { par1, par2 } = item;

  const valueCoef = usePlayerStatsAnimationCtx();

  const par1Title = par1 === 'RHB' ? 'Right' : par1;
  const par2Title = par2 === 'LHB' ? 'Left Handed Batters' : par2;

  const title = `${par1Title} / ${par2Title} (${parent[par1]} / ${parent[par2]})`;
  const value = parent[`${par1}/${par2}`];
	const formattedValue = value !== '–' ? value : '—'

	if (par1 === 'RHB') {
    const itemClasses = classNames(cl.groupItem, cl.rhbLhbGroupItem);

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

    const { formattedValue: valueLeft, animatedValue: animatedValueLeft } = getValues(parent[par1], parent[par1] + parent[par2]);
    const { formattedValue: valueRight } = getValues(parent[par2], parent[par1] + parent[par2]);
		const animatedValueRight = valueRight > 0 ? `${Number(((100 - valueLeft) * valueCoef).toFixed(1))}%` : '0%';

    return (
      <div className={itemClasses}>
        <div>{title}</div>
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
  }

  return (
    <div className={cl.groupItem}>
      <p>{title}</p>
      <p>{formattedValue}</p>
    </div>
  );
};

const TotalInfo = ({ data }) => {
  const itemsArr = [
    { par1: 'IP', par2: 'G' },
    { par1: 'Pitches', par2: 'Batters' },
    { par1: 'RHB', par2: 'LHB' }
  ];
  return (
    <div className={cl.group}>
      <p className={cl.title}>Total info</p>
      {itemsArr.map((item, i) => (
        <TotalInfoItem key={i} item={item} parent={data.TotalInfo} />
      ))}
    </div>
  );
};

export default TotalInfo