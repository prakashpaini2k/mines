import React, { useState,useEffect } from 'react'
import bomb from './assets/mine.svg'
import ruby from './assets/gem.svg'

const Cell = (props) => {
const [isRevealed, setIsRevealed] = useState(false)
const {cellState,cellChange,gameState,index,handleClick } = props
const handleCellClick = () => {
    if( gameState === 'playing' && !isRevealed) {
        setIsRevealed(true)
        handleClick(index)
    }
}
useEffect(() => {
    setIsRevealed(false)
},[cellChange])

  return (
    <div className="cell" onClick={handleCellClick}>
        { isRevealed && cellState === 'gem' && <img className='gem' src={ruby} alt="gem" />}
        { isRevealed && cellState === 'mine' && <img className='mine' src={bomb} alt="mine" />}
    </div>
  )
}   

export default Cell