import HitsAnglesGraph from './HitsAnglesGraph';
import cl from './HitsAnglesGraphs.module.scss';

const HitsAnglesGraphs = ({ data }) => {
  const notNullAngleData = data.filter(({ hit_info: { angle } }) => angle !== null);

  console.log(notNullAngleData);
  return (
    <div className={cl.wrapper}>
      <HitsAnglesGraph title='Hits by angle, hits' />
      <HitsAnglesGraph title='Exit velocity by angle, mph' />
      <HitsAnglesGraph title='Distance by angle, m' />
    </div>
  );
};

export default HitsAnglesGraphs;
