import React from 'react';

const ContentBoxTableHeader = ({ TABLES_INFO, tableName }) => {
  return (
    <thead>
      <tr>
        <th></th>
        <th></th>
        {TABLES_INFO[tableName].headers.map((title, i) => {
					const titleText = title === 'SB_pr' ? '%SB' : title === 'FLD' ? 'FLD%' : title

          return <th key={i}>{titleText}</th>;
        })}
      </tr>
    </thead>
  );
};

export default ContentBoxTableHeader;
