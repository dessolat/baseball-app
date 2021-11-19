import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGameId } from 'redux/gameReducer';
import cl from './GameIdForm.module.scss';

const GameIdForm = ({isLoading}) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    input !== '' && dispatch(setGameId(input));
  };

  return (
    <form className={cl.form} onSubmit={e => handleSubmit(e)}>
      <input type='text' placeholder='id' value={input} onChange={e => setInput(e.target.value)} disabled={isLoading}/>
      <button disabled={isLoading}>Change</button>
    </form>
  );
};

export default GameIdForm;
