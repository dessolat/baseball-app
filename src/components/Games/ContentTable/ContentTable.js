import React from 'react';
import cl from './ContentTable.module.scss';
import ContentTableHeader from './ContentTableHeader';

const ContentTable = () => {
  

  return (
    <div className={cl.wrapper}>
			<ContentTableHeader />
			
			<div className={cl.table}>

			</div>
    </div>
  );
};

export default ContentTable;
