import React, { useState } from 'react';
import './App.css';
import Cell from './cell';

function App() {
  console.log('app rendered');
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(100);
  const [score, setScore] = useState(0);
  const [mineCount, setMineCount] = useState(3);
  const [gameState, setGameState] = useState('init');
  const [counter, setCounter] = useState(0)
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
  const gameOver = () => {
    setGameState('over');
    setCounter(0)
    setScore(0)
  }
  const handleClick = (index) => {
    if (board[index] === 'mine' && gameState === 'playing') {
      gameOver()
    }
    else if (gameState === 'playing') {
      setCounter(counter + 1)
      let multiplier = 1 + (mineCount * counter / 10);
      setScore(bet * multiplier);
    }
  }

  const handleBet = () => {
    if (balance < 1){
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
      setCellChange(!cellChange)
      setBoard(genereateBoard())
      setGameState('playing');
    }
  }
  const handleCollect = () => {
    if (bet === 0) {
      setBalance(parseInt(balance + 0));
    }
    else{
      setBalance(parseInt(balance + score));
    }
    setCellChange(!cellChange)
    gameOver()
  }

  return (
    <div className="App">
      <div className="header-wrapper">
        <div className="header">
          <div className="logo">Mines</div>
          <div className="balance">balance : {balance}</div>
        </div>
      </div>
      <div className="main">
        <div className="board">
          {board.map((state, index) => (
            <Cell key={index} gameState={gameState} cellChange={cellChange} cellState={state} index={index} handleClick={handleClick}></Cell>
          ))}
        </div>
        <div className="controls">
          <label htmlFor="bet">
            Bet
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
