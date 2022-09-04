import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from 'utils';

const RowLink = ({ to, id }) => {
  return <Link to={`/game/${id}?tab=${to}`}>{capitalizeFirstLetter(to)}</Link>;
};

export default RowLink;
