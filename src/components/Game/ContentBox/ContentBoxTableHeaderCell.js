import React from 'react';

const ContentBoxTableHeaderCell = ({ title }) => {
  const titleText = title === 'SB_pr' ? '%SB' : title === 'FLD' ? 'FLD%' : title;

  return <th>{titleText}</th>;
};

export default ContentBoxTableHeaderCell;
