import React from 'react'
import hangmanimage from '../assets/hangman.png'

const StartScreen = ({ startGame }) => {
  return (
    <div>
        <h1>Hangman</h1>
        <img src={hangmanimage} style={ { maxWidth: '200px' } }/>
        <p className="text-yellow-200 mt-3">Press the button to start game</p>
        <button 
            onClick={startGame}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
            Start game
        </button>
    </div>
  )
}

export default StartScreen