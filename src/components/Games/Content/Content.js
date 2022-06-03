import React from 'react';
import ContentSideTables from '../ContentSideTables/ContentSideTables';
import ContentTable from '../ContentTable/ContentTable';
import { useSelector } from 'react-redux';
import cl from './Content.module.scss';

const Content = ({ games }) => {
  const currentLeague = useSelector(state => state.games.currentLeague);

  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          <ContentTable games={games} />
          {currentLeague.id !== -1 && <ContentSideTables />}
        </div>
      </div>
    </section>
  );
};

export default Content;
