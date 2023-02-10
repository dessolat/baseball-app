import React from 'react';
import cl from './ContentGraphs.module.scss';
// import FrequencySpeedGraph from '../FrequencySpeedGraph/FrequencySpeedGraph';
// import BreakGraph from '../BreakGraph/BreakGraph';
// import TypesGraph from '../TypesGraph/TypesGraph';
// import ArsenalGraph from '../ArsenalGraph/ArsenalGraph';
// import DotsGraph from '../DotsGraph/DotsGraph';
// import PlayerImgLeft from '../../../images/player_left.png';
// import PlayerImgRight from '../../../images/player_right.png';
import Banner from './Banner/Banner';
import FilteredGraphs from './FilteredGraphs/FilteredGraphs';

const ContentGraphs = () => {
	const fakeData = {}

	

  return (
    <div className={cl.graphsWrapper}>
      <Banner />
			<FilteredGraphs />

      {/* <div className={cl.graphRow}>
        <FrequencySpeedGraph />
        <BreakGraph />
        <TypesGraph />
      </div>
      <div className={cl.graphRow} style={{ marginTop: '30px' }}>
        <ArsenalGraph />
      </div>
      <div className={cl.graphRow} style={{ marginTop: '80px', padding: '0 35px 50px' }}>
        <img src={PlayerImgRight} alt='player' />
        <DotsGraph color='red' />
        <DotsGraph color='green' />
        <DotsGraph color='blue' />
        <DotsGraph color='yellow' />
        <DotsGraph color='olive' />
      </div>
      <div className={cl.graphRow} style={{ marginTop: '50px', padding: '0 35px 50px' }}>
        <img src={PlayerImgLeft} alt='player' />
        <DotsGraph color='red' />
        <DotsGraph color='green' />
        <DotsGraph color='blue' />
        <DotsGraph color='yellow' />
        <DotsGraph color='olive' />
      </div> */}
    </div>
  );
};

export default ContentGraphs;
