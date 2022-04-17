import React from 'react';
import cl from './ContentBox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getShortName } from 'utils';
import { setBoxActiveButton } from 'redux/gameReducer';

const ContentBoxButtons = () => {
	const activeButton = useSelector(state => state.game.boxActiveButton);
	const preview = useSelector(state => state.game.preview);
  const dispatch = useDispatch();
	
	const getClassName = name => (name === activeButton ? cl.active : null);

  const handleButtonClick = name => () => dispatch(setBoxActiveButton(name));
  return (
    <div className={cl.buttons}>
      <span className={getClassName('guests')} onClick={handleButtonClick('guests')}>
        {preview && getShortName(preview.guests.name, 8)}
      </span>
      <span className={getClassName('owners')} onClick={handleButtonClick('owners')}>
        {preview && getShortName(preview.owners.name, 8)}
      </span>
    </div>
  );
};

export default ContentBoxButtons;
