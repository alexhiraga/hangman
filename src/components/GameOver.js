import React from 'react'
import gameoverimage from '../assets/game_over.png'

const GameOver = ({ backToStartScreen, score }) => {
  return (
    <div>
        <img src={gameoverimage} />

        <p className="my-4">
            Final Score: <strong className="font-bold text-green-500 text-xl">{score}</strong>
        </p>
        <button
            onClick={backToStartScreen}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Back to home
        </button>
    </div>
  )
}

export default GameOver