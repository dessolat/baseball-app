import React from 'react';
import { forwardRef } from 'react';
import ContentTableListItem from './ContentTableListItem';

const ContentTableList = ({ cl, filteredData }, ref) => (
  <ul className={cl.rows}>
    {filteredData.map((game, index, arr) => (
      <ContentTableListItem key={index} game={game} index={index} arr={arr} cl={cl} ref={ref} />
    ))}
  </ul>
);
export default forwardRef(ContentTableList);
