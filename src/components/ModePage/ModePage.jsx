import React, {useEffect, useRef, useState} from 'react';
import {
  DollarSign,
  Plus,
  X,
  ArrowDownLeft,
  Check,
} from "react-feather";

import './ModePage.scss';

function ModePage() {

  const [textResult, setTextResult] = useState('Make the Bet and Start');
  const [totalBet, setTotalBet] = useState(500);
  const [deposit, setDeposit] = useState(10000);
  const [currentCheck, setCurrentCheck] = useState(true);

  const [playerValue, setPlayerValue] = useState(0);
  const [bankerValue, setBankerValue] = useState(0);

  useEffect(() => {
    if (currentCheck === false && bankerValue < 21) {
      setBankerValue(bankerValue + Math.floor(Math.random() * 12) + 1);
    }
  }, [currentCheck, bankerValue])

  const addCard = () => {
    if (currentCheck && playerValue < 21) {
      setPlayerValue(playerValue + (Math.floor(Math.random() * 12) + 1));
      if (playerValue > 21) {
        setCurrentCheck(!currentCheck);
      }
    }
  }

  const startGame = () => {
    setTextResult('');
    document.querySelector('.mode-block__button').disabled = false;
  }

  const makeBet = () => {
    if (deposit > 0) {
      setTotalBet(totalBet + 500);
      setDeposit(deposit - 500);
    }
    return;
  }

  const removeBet = () => {
    if (deposit < 10500) {
      setTotalBet(totalBet - 500);
      setDeposit(deposit + 500);
    }
    return;
  }

  return (
    <div className="mode-border-wrapper">
      <div className="mode-block">

        <div className="mode-block__game-content">
          <div className="mode-block__card">{bankerValue}</div>
        </div>

        <div className="mode-block__game-result">{textResult}</div>

        <div className="mode-block__game-content">
          <div className="mode-block__card">{playerValue}</div>
        </div>

        <div className="mode-block__container">
          <button onClick={removeBet} className="mode-block__button">
            <ArrowDownLeft size={30} color="#e6e6e6" />
          </button>
          <button onClick={makeBet} className="mode-block__button">
            <DollarSign size={30} color="#e6e6e6" />
          </button>
          <button onClick={startGame} className="mode-block__button">
            <Check size={30} color="#e6e6e6" />
          </button>
          <button className="mode-block__button">
            <X size={30} color="#e6e6e6" />
          </button>
          <button onClick={() => addCard(true)} className="mode-block__button">
            <Plus size={30} color="#e6e6e6" />
          </button>
        </div>

        <div className="mode-block__container">
          <div className="mode-block__credits">Deposit: {deposit}</div>
          <div className="mode-block__credits">Total bet: {totalBet}</div>
        </div>

      </div>
    </div>
  );
}

export default ModePage;
