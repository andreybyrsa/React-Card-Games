import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ChevronsUp,
  ChevronsDown,
} from "react-feather";

import './ModePage.scss';

function ModePage() {

  const playerValueRef = useRef();
  const bankirValueRef = useRef();
  const betValue = useRef();

  const [textResult, setTextResult] = useState('Make the Bet and Start');
  const [bet, setBet] = useState(0);
  const [deposit, setDeposit] = useState(10000);

  const [playerValue, setPlayerValue] = useState(0);
  const [bankirValue, setBankerValue] = useState(0);

  useEffect(() => {
    bankirValueRef.current = bankirValue;
    playerValueRef.current = playerValue;
    betValue.current = bet;
  }, [playerValue, bankirValue, bet])

  const getRandomPlayerValue = useCallback(() => {
    let randomValue = Math.floor(Math.random() * 11) + 1;
    console.log(playerValueRef.current, randomValue, 'player');
    if (playerValueRef.current + randomValue >= 10) {
      setPlayerValue(prev => prev + randomValue - 10);
    } else {
      setPlayerValue(prev => prev + randomValue);
    }
  }, [])

  const getRandomBankirValue = useCallback(() => {
    let randomValue = Math.floor(Math.random() * 11) + 1;
    console.log(bankirValueRef.current, randomValue, 'bankir');
    if (bankirValueRef.current + randomValue >= 10) {
      setBankerValue(prev => prev + randomValue - 10);
    } else {
      setBankerValue(prev => prev + randomValue);
    }
  }, []);

  const makeResult = useCallback((timerFunc1, timerFunc2, value) => {
    clearInterval(timerFunc1);
    clearInterval(timerFunc2);
    if (value === 'player') {
      if (playerValueRef.current > bankirValueRef.current) {
        setDeposit(prev => prev + 2 * betValue.current);
        setBet(0);
      } else if (playerValueRef.current === bankirValueRef.current) {
        setDeposit(prev => prev + betValue.current);
        setBet(0);
      } else {
        setDeposit(prev => prev);
        setBet(0);
      }
    } else {
      if (playerValueRef.current < bankirValueRef.current) {
        setDeposit(prev => prev + 2 * betValue.current);
        setBet(0);
      } else if (playerValueRef.current === bankirValueRef.current) {
        setDeposit(prev => prev + betValue.current);
        setBet(0);
      } else {
        setDeposit(prev => prev);
        setBet(0);
      }
    }
    console.log(betValue.current);
    console.log(deposit);
  }, [])

  const startGame = useCallback((value)  => {
    if (betValue.current === 0) {
      setTextResult('Make the Bet and Start');
      return 0;
    }
    setBankerValue(0);
    setPlayerValue(0);
    setTextResult('');

    let timer1 = setInterval(getRandomPlayerValue, 500);
    let timer2 = setInterval(getRandomBankirValue, 700);

    setTimeout(() => makeResult(timer1, timer2, value), 1444);
  }, [bet]);


  const makeBet = () => {
    if (deposit > 0) {
      setBet(bet + 500);
      setDeposit(deposit - 500);
    }
    return 0;
  }

  const removeBet = () => {
    if (bet !== 0 && bet > 0) {
      setBet(bet - 500);
      setDeposit(deposit + 500);
    }
    return 0;
  }

  return (
    <div className="mode-border-wrapper">
      <div className="mode-block">
        <span className="mode-block__players">banker</span>
        <div className="mode-block__game-content no-padding-bottom no-padding-top">
          <div className="mode-block__card">{bankirValue}</div>
        </div>

        <div className="mode-block__game-result">{textResult}</div>

        <div className="mode-block__game-content no-padding-top no-padding-bottom">
          <div className="mode-block__card">{playerValue}</div>
        </div>
        <span className="mode-block__players">player</span>

        <div className="mode-block__container separate-top">
          <button onClick={() => startGame('banker')} className="mode-block__button">Banker</button>
          <button onClick={() => startGame('player')} className="mode-block__button">Player</button>
        </div>

        <div className="mode-block__container no-padding-top separate-bottom">
          <div className="mode-block__credits">Deposit: {deposit}€</div>
          <div className="mode-block__credits">
            <span>Bet: {bet}€</span>
            <div>
              <ChevronsDown
                onClick={removeBet}
                className="mode-block__button icon"
                size={30}
                color="#e6e6e6"
              />
              <ChevronsUp
                onClick={makeBet}
                className="mode-block__button icon"
                size={30}
                color="#e6e6e6"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ModePage;
