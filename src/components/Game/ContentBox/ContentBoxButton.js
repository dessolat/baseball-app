import React from 'react';
import cl from './ContentBox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getShortName } from 'utils';
import { setBoxActiveButton } from 'redux/gameReducer';

const ContentBoxButton = ({ team }) => {
  const { preview, boxActiveButton: activeButton } = useSelector(state => state.game);

  const dispatch = useDispatch();

  const getClassName = name => (name === activeButton ? cl.active : null);

  const handleButtonClick = name => () => dispatch(setBoxActiveButton(name));

  return (
    <span className={getClassName(team)} onClick={handleButtonClick(team)}>
      {preview && getShortName(preview[team].name, 8)}
    </span>
  );
};

export default ContentBoxButton;
