import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './GameIdForm.module.scss';

const GameIdForm = ({isLoading}) => {
  const [input, setInput] = useState('');
	const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
		if (input === '') return
		navigate(`/game/${input}`)
  };

  return (
    <form className={cl.form} onSubmit={e => handleSubmit(e)}>
      <input type='text' placeholder='id' value={input} onChange={e => setInput(e.target.value)} disabled={isLoading}/>
      <button disabled={isLoading}>Change</button>
    </form>
  );
};

export default GameIdForm;
