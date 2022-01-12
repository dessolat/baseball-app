import React from 'react';
import PlaysRunningInfoItem from './PlaysRunningInfoItem';

const runningList = [
  { title: 'Run to first base by Batter:', value: 'S: 5.7 m/s TB: 1.5 s' },
  { title: 'Throwing ball to 2B by LF:', value: 'D: 20 m    HT: 1.5 s   AS: 100 %' },
  { title: 'Run to second base by Runner 1:', value: 'S: 5.7 m/s TB: 2.0 s' },
  { title: 'Run to second base by Batter:', value: 'S: 5.7 m/s TB: 1 s' },
  { title: 'Throwing ball to 1B by 2B:', value: 'D: 20 m    HT: 3 s   AS: 100 %' },
  { title: 'Run to first base by Batter:', value: 'S: 5.7 m/s TB: 1 s' }
];

const PlaysRunningInfoList = () => {
  return (
    <ul>
      {runningList.map((item, i) => (
        <PlaysRunningInfoItem key={i} item={item} />
      ))}
    </ul>
  );
};

export default PlaysRunningInfoList;
