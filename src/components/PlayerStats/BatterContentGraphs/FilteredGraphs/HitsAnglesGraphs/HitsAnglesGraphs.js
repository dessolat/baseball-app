import HitsAnglesGraph from './HitsAnglesGraph';
import cl from './HitsAnglesGraphs.module.scss';

const HitsAnglesGraphs = ({ data }) => {
  const notNullAngleData = data.filter(({ hit_info: { angle } }) => angle !== null);

  const defaultAnglesValues = [];

  for (let i = -90; i <= 80; i += 10) {
    defaultAnglesValues.push({
      deg: i,
      hitsCount: 0,
      sumVelocity: 0,
      avgVelocity: 0,
      sumDistance: 0,
      avgDistance: 0
    });
  }

  const angleValues = notNullAngleData.reduce(
    (sum, { hit_info: { angle, distance, 'exit velocity': exitVelocity } }, index) => {
      const resultAngle = Math.floor(angle / 10) * 10;
      const sumIndex = resultAngle / 10 + 9;
      const sumAngleObj = sum[sumIndex];

      sumAngleObj.hitsCount++;

      sumAngleObj.sumVelocity += exitVelocity;
      sumAngleObj.avgVelocity = sumAngleObj.sumVelocity / sumAngleObj.hitsCount;

      sumAngleObj.sumDistance += distance;
      sumAngleObj.avgDistance = sumAngleObj.sumDistance / sumAngleObj.hitsCount;

      return sum;
    },
    defaultAnglesValues
  );

  return (
    <div className={cl.wrapper}>
      <HitsAnglesGraph title='Hits by angle, hits' angleValues={angleValues} dataField='hitsCount' />
      <HitsAnglesGraph
        title='Exit velocity by angle, mph'
        angleValues={angleValues}
        dataField='avgVelocity'
      />
      <HitsAnglesGraph title='Distance by angle, m' angleValues={angleValues} dataField='avgDistance' />
    </div>
  );
};

export default HitsAnglesGraphs;
