import React, { useState } from 'react';
import './App.css';
import Cell from './cell';

function App() {
  console.log('app rendered');
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(100);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0)
  const [mineCount, setMineCount] = useState(3);
  const [gameState, setGameState] = useState('init');
  const [multiplier, setMultiplier] = useState(0)
  const [cellChange, setCellChange] = useState(false)
  const genereateBoard = () => {
    let board = Array(25).fill('gem');
    let bombPositions = [];
    while (bombPositions.length < mineCount) {
      let position = Math.floor(Math.random() * 25);
      if (!bombPositions.includes(position)) {
        bombPositions.push(position);
        board[position] = 'mine';
      }
    }
    return board
  };

  const [board, setBoard] = useState(genereateBoard());

  const gameStart = () => {
    setGameState('playing');
    setCounter(0)
    setMultiplier(0)
    setScore(0)
  }
  const handleClick = (index) => {
    if (board[index] === 'mine' && gameState === 'playing') {
      setGameState('over');
      setCounter(0)
      setMultiplier(0)
      setScore(0)
    }
    else if (gameState === 'playing') {
      setCounter(parseInt(counter) + 1)
      let multiplier = (1+ (parseInt(counter*mineCount*counter) / parseInt(24 - counter))).toFixed(2);
      setMultiplier(multiplier)
      let score = parseInt(bet * multiplier).toFixed(2);
      setScore(score)
    }
  }

  const handleBet = () => {
    if (balance < 1) {
      alert('you lost , but dont worry you can bet again here is your 100')
      setBalance(100)
    }
    else if (balance < bet) {
      alert('Insufficient Balance ( bet amount exceeds your balance )')
    }
    else if (mineCount < 1 || mineCount > 24) {
      alert('Invalid mine count mine scount should be between 1 to 24');
    }
    else {
      setBalance(balance - parseInt(bet));
      setScore(bet)
      setCellChange(!cellChange)
      setBoard(genereateBoard())
      gameStart()
    }
  }
  const handleCollect = () => {
    if (counter === 0) {
      alert('You have not clicked any cell yet')
      return
    }
    else{
      setBalance(parseInt(balance) + parseInt(score));
      setCellChange(!cellChange)
      setGameState('over');
    }
  }

  return (
    <div className="App">
      <div className="header-wrapper">
        <div className="header">
          <div className="logo">Mines</div>
          <div className="balance">balance : $ {balance}</div>
        </div>
      </div>
      <div className="main">
        <div className="board">
        {gameState === 'over' && <div className="popup">
          <div> {multiplier}x</div>
          <div> $ {score}</div>
        </div>}
          {board.map((state, index) => (
            <Cell key={index} gameState={gameState} cellChange={cellChange} cellState={state} index={index} handleClick={handleClick}></Cell>
          ))}
        </div>
       
        <div className="controls">
          <label htmlFor="bet">
            Bet $ 
            <input name="bet" type="number" value={bet} onChange={(e) => setBet(e.target.value)}></input>
          </label>
          {gameState === 'playing' ? <button onClick={handleCollect}>Collect</button> : <button onClick={handleBet}>Bet</button>}
          <label htmlFor="mineCount">
            Mines
            <input name="mineCount" type="number" value={mineCount} onChange={(e) => setMineCount(e.target.value)}></input>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
