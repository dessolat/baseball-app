import React from 'react';
import ContentPlayersTable from '../ContentPlayersTable/ContentPlayersTable';
import ContentGamesTable from '../ContentGamesTable/ContentGamesTable';
import cl from './Content.module.scss';

const Content = ({ games }) => {
  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          <ContentPlayersTable games={games} />
          <ContentGamesTable />
        </div>
      </div>
    </section>
  );
};

export default Content;
