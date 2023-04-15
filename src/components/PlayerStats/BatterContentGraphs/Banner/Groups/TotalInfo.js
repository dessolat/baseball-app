import cl from '../Banner.module.scss';

const TotalInfoItem = ({ item, parent }) => {
  const { par1, par2 } = item;

  const par1Title = par1 === 'RHB' ? 'Right' : par1;
  const par2Title = par2 === 'LHB' ? 'Left Handed Batters' : par2;

  const title = `${par1Title} / ${par2Title} (${parent[par1]} / ${parent[par2]})`;
  const value = parent[`${par1}/${par2}`];
	const formattedValue = value !== '–' ? value : '—'
  return (
    <div className={cl.groupItem}>
      <p>{title}</p>
      <p>{formattedValue}</p>
    </div>
  );
};

const TotalInfo = ({ data }) => {
	console.log(data);
  const itemsArr = [
    { par1: 'PA', par2: 'G' },
    { par1: 'Pitches', par2: 'PA' },
    { par1: 'PA', par2: 'Pitches' },
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