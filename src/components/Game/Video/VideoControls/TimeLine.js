import React from 'react';

const TimeLine = ({ cl }) => {
  return (
    <div className={cl.timeLine}>
      <div className={cl.progressBar}></div>
    </div>
  );
};

export default TimeLine;
