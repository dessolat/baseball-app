import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVideoEffects } from 'redux/gameReducer';
import cl from './VideoOptions.module.scss';

const Effects = () => {
	const isVideoEffects = useSelector(state => state.game.isVideoEffects)

	const dispatch = useDispatch()

	const handleChange = e => dispatch(setIsVideoEffects(e.target.checked));
  return (
    <div className={cl.effectsWrapper}>
      Effects
      <SimpleToggler checked={isVideoEffects} onChange={handleChange} />
    </div>
  );
};

export default Effects;
