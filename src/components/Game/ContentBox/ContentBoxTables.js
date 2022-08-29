import React from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxTable from './ContentBoxTable';
import ContentBoxButtons from './ContentBoxButtons';

const ContentBoxTables = ({ tableData }) => {
  return (
    <div className='container'>
      <div className={cl.tables}>
        <ContentBoxTable
          tableData={tableData}
          tableClass={cl.battingTable}
          tableName='batting'
          footerOffset={2}
          toFixList={['AVG', 'SLG', 'OBP', 'OPS', 'SB_pr', 'FLD']}
        />
        <ContentBoxTable
          tableData={tableData}
          tableClass={cl.pitchingTable}
          tableName='pitching'
          footerOffset={1}
          toFixList={['ERA']}
        />
        <ContentBoxTable
          tableData={tableData}
          tableClass={cl.catchingTable}
          tableName='catching'
          footerOffset={1}
        />
        <ContentBoxButtons />
      </div>
    </div>
  );
};

export default ContentBoxTables;
