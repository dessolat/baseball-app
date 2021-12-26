import React, { useState } from 'react';
import cl from './GameIdForm.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RoundLoader from '../../UI/loaders/RoundLoader/RoundLoader';

const GameIdForm = ({ isLoading }) => {
  const [input, setInput] = useState('');
  const [isURLChecking, setIsURLChecking] = useState(false);
  const [checkingError, setCheckingError] = useState('');
  const navigate = useNavigate();

  //Game exist checking
  const testFetch = async id => {
    try {
      setIsURLChecking(true);
      await axios.get(`http://51.250.11.151:3030/game_${id}`, {
        timeout: 2500
      });
      return true;
    } catch ({ message }) {
      const errMessage = message[0].toUpperCase() + message.slice(1);
      setCheckingError(errMessage);
      setTimeout(() => setCheckingError(''), 2500);
      return false;
    } finally {
      setIsURLChecking(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (input === '') return;

    (await testFetch(input)) === true && navigate(`/game/${input}`);
  };

  const handleChange = e => setInput(e.target.value);

  const isDisabled = isLoading || isURLChecking;
  const errorStyles = { color: 'red', fontWeight: 600, marginLeft: 30, height: 20 };
  const renderedBttn = isURLChecking ? <RoundLoader /> : <button disabled={isDisabled}>Change</button>;

  return (
    <form className={cl.form} onSubmit={handleSubmit}>
      <input type='text' placeholder='id' value={input} onChange={handleChange} disabled={isDisabled} />
      {renderedBttn}
      <span style={errorStyles}>{checkingError}</span>
    </form>
  );
};

export default GameIdForm;
