import React from 'react';
import cl from './Content.module.scss';
import { useParams } from 'react-router-dom';
import ContentTeamTable from '../ContentTeamTable/ContentTeamTable';
import ContentPlayerTable from '../ContentPlayerTable/ContentPlayerTable';

const Content = () => {
  const { statsType } = useParams();

  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {statsType !== 'player' ? <ContentTeamTable /> : <ContentPlayerTable />}
        </div>
      </div>
    </section>
  );
};

export default Content;
