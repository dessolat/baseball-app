import React from 'react';
import ContentPlayersTable from '../ContentPlayersTable/ContentPlayersTable';
import ContentGamesTable from '../ContentGamesTable/ContentGamesTable';
import cl from './Content.module.scss';
import { useSelector } from 'react-redux';
import ContentMobileHeader from '../ContentMobileHeader/ContentMobileHeader';

const Content = () => {
  const isMobile = useSelector(state => state.shared.isMobile);
  const mobileTableMode = useSelector(state => state.teamGames.mobileTableMode);

	const isPlayersTable = mobileTableMode === 'Players'
	const isGamesTable = mobileTableMode === 'Calendar' || !isMobile
  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {isMobile && <ContentMobileHeader />}
          {isPlayersTable && <ContentPlayersTable />}
          {isGamesTable && <ContentGamesTable />}
        </div>
      </div>
    </section>
  );
};

export default Content;
