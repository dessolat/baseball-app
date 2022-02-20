import React from 'react';
import ContentSideTables from '../ContentSideTables/ContentSideTables';
import ContentTable from '../ContentTable/ContentTable';
import cl from './Content.module.scss';

const Content = ({ games }) => {
  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          <ContentTable games={games} />
          <ContentSideTables />
        </div>
      </div>
    </section>
  );
};

export default Content;
