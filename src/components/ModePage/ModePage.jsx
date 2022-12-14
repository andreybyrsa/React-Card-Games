import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ChevronsUp,
  ChevronsDown,
} from 'react-feather';

import './ModePage.scss';

function ModePage() {

  const [gameResults, setGameResults] = useState([]);

  const playerValueRef = useRef();
  const bankerValueRef = useRef();
  const betValue = useRef();
  const resultsValue = useRef();

  const [textResult, setTextResult] = useState('Make the Bet and Start');
  const [bet, setBet] = useState(0);
  const [deposit, setDeposit] = useState(10000);
  const [toggle, setToggle] = useState(false);

  const [playerValue, setPlayerValue] = useState(0);
  const [bankerValue, setBankerValue] = useState(0);

  useEffect(() => {
    bankerValueRef.current = bankerValue;
    playerValueRef.current = playerValue;
    betValue.current = bet;
    resultsValue.current = gameResults;
  }, [playerValue, bankerValue, bet, gameResults])

  useEffect(() => {
    const currentArray = resultsValue.current;
    let column = 1;
    let result = document.createElement('div');
    result.innerHTML = '⬤';
    result.className = (currentArray[0] === 1) ? 'circle-1' : 'circle-2';
    console.log(currentArray, 'текущая длина');
    if (currentArray.length > 1) {
      for (let i = 1; i < currentArray.length; i++) {
        result.className = (currentArray[i] === 1) ? 'circle-1' : 'circle-2';
        if (currentArray[i] === currentArray[i - 1]) {
          document.getElementById(`result-${column}`).insertAdjacentElement('beforeend', result);
        } else {
          column += 1;
          document.getElementById(`result-${column}`).insertAdjacentElement('beforeend', result);
        }
      }
    } else if (currentArray.length === 1) {
      document.getElementById(`result-${column}`).insertAdjacentElement('beforeend', result);
    }
  }, [gameResults])

  const getRandomPlayerValue = useCallback(() => {
    let randomValue = Math.floor(Math.random() * 10) + 1;
    console.log(playerValueRef.current, randomValue, 'player');
    if (playerValueRef.current + randomValue >= 10) {
      setPlayerValue(prev => prev + randomValue - 10);
    } else {
      setPlayerValue(prev => prev + randomValue);
    }
  }, [])

  const getRandomBankerValue = useCallback(() => {
    let randomValue = Math.floor(Math.random() * 10) + 1;
    console.log(bankerValueRef.current, randomValue, 'banker');
    if (bankerValueRef.current + randomValue >= 10) {
      setBankerValue(prev => prev + randomValue - 10);
    } else {
      setBankerValue(prev => prev + randomValue);
    }
  }, []);

  const makeResult = useCallback((timerFunc1, timerFunc2, value) => {
    clearInterval(timerFunc1);
    clearInterval(timerFunc2);
    if (value === 'player') {
      if (playerValueRef.current > bankerValueRef.current) {
        setDeposit(prev => prev + 2 * betValue.current);
        setBet(0);
        setGameResults([...resultsValue.current, 1]);
        setTextResult('You win');
      } else if (playerValueRef.current === bankerValueRef.current) {
        setDeposit(prev => prev + betValue.current);
        setBet(0);
        setTextResult('Tie');
      } else {
        setDeposit(prev => prev);
        setBet(0);
        setGameResults([...resultsValue.current, 2]);
        setTextResult('Banker win');
      }
    } else {
      if (playerValueRef.current < bankerValueRef.current) {
        setDeposit(prev => prev + 2 * betValue.current);
        setBet(0);
        setGameResults([...resultsValue.current, 2]);
        setTextResult('You win');
      } else if (playerValueRef.current === bankerValueRef.current) {
        setDeposit(prev => prev + betValue.current);
        setBet(0);
        setTextResult('Tie');
      } else {
        setDeposit(prev => prev);
        setBet(0);
        setGameResults([...resultsValue.current, 1]);
        setTextResult('Player win');
      }
    }
    setToggle(false);
    console.log(betValue.current);
    console.log(deposit);
    console.log(resultsValue.current);
  }, [])

  const startGame = useCallback((value)  => {
    if (betValue.current === 0) {
      setTextResult('Make the Bet and Start');
      return 0;
    }
    setToggle(true);
    setBankerValue(0);
    setPlayerValue(0);
    setTextResult('Process');

    let timer1 = setInterval(getRandomPlayerValue, 500);
    let timer2 = setInterval(getRandomBankerValue, 700);

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
          <div className="mode-block__card">{bankerValue}</div>
        </div>
        <div className="mode-block__game-result">{textResult}</div>

        <div className="mode-block__game-content no-padding-top no-padding-bottom">
          <div className="mode-block__card">{playerValue}</div>
        </div>
        <span className="mode-block__players">player</span>

        <div style={{padding: '0 8px', width: '100%'}}>
          <div className="mode-block__container separate-top">
            <button disabled={toggle} onClick={() => startGame('banker')} className="mode-block__button">Banker</button>
            <button disabled={toggle} onClick={() => startGame('player')} className="mode-block__button">Player</button>
          </div>
        </div>

        <div style={{padding: '0 8px', width: '100%'}}>
          <div className="mode-block__container no-padding-top separate-bottom">
            <div className="mode-block__credits">Deposit: {deposit}€</div>
            <div style={{justifyContent: 'flex-end',}} className="mode-block__credits">
              <span style={{marginRight: '8px',}}>Bet: {bet}€</span>
              <div>
                <button disabled={toggle} onClick={makeBet}>
                  <ChevronsUp
                    className="mode-block__button icon"
                    size={30}
                    color="#D48A2FFF"
                  />
                </button>
                <button disabled={toggle} onClick={removeBet}>
                  <ChevronsDown
                    className="mode-block__button icon"
                    size={30}
                    color="#D48A2FFF"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="mode-block__table-results">
          {gameResults.map((elem, index) => {
            return <div key={index} id={`result-${index + 1}`} className="mode-block__results result"></div>
          })}
        </div>

      </div>
    </div>
  );
}

export default ModePage;
