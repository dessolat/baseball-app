import React from 'react';
import ContentBoxTableHeaderCell from './ContentBoxTableHeaderCell';

const ContentBoxTableHeader = ({ TABLES_INFO, tableName }) => {
  return (
    <thead>
      <tr>
        <th></th>
        <th></th>
        {TABLES_INFO[tableName].headers.map((title, i) => (
          <ContentBoxTableHeaderCell key={i} title={title} />
        ))}
      </tr>
    </thead>
  );
};

export default ContentBoxTableHeader;
