import React from 'react';
import { Link } from 'react-router-dom';

const RowLink = ({ to, id }) => {
  return <Link to={`/game/${id}?tab=${to}`}>{to[0].toUpperCase() + to.slice(1)}</Link>;
};

export default RowLink;
