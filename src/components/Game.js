import React from 'react'
import './Game.css'

const Game = ({ isGameOver, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, verifyLetter, keyboard, setKeyboard }) => {

    function handleButton(letter) {
        removeLetter(letter)
    }

    function removeLetter(letter) {
        if(keyboard.includes(letter.toUpperCase())){
            var index = keyboard.indexOf(letter.toUpperCase())
            if(index !== -1){
                keyboard.splice(index, 1)
                const newLetters = keyboard
                setKeyboard(newLetters)

                //add to guessedLetters
                verifyLetter(letter)
            }
        }
    }
    
    return (
        <div>
            <h1>Guess the word</h1>
            <div>
                <img className="flex mx-auto max-w-sm" src={`https://raw.githubusercontent.com/william-costa/wdev-hangman-game-resources/master/images/hangman/${guesses}.svg`} />
            </div>
            <p>Hint: <span className="font-bold text-yellow-300 text-xl">{pickedCategory}</span></p>
            <div className="mt-2 flex justify-center ">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter.toUpperCase()) ? (
                        <span key={i} className="letter">
                            {letter}
                        </span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
            </div>
            <div className="flex justify-between my-6">

                <div>
                    Used letters: 
                    {wrongLetters.map((key) => (
                        <span className='mx-1 text-red-400 text-xl font-bold'>{key}</span>
                        ))}
                </div>

                <div>
                    Score: <span className="text-xl font-bold text-green-400">{score}</span>
                </div>
            </div>
            <div className="keyboard max-w-xl mb-6 mt-3">
                {keyboard.map( (key) => (
                    <button key={key} onClick={() => handleButton(key)} 
                        className="buttonsKeyboard bg-gray-200 hover:bg-gray-400 text-black font-bold py-1 px-3 m-1 rounded"
                    >
                        {key}
                    </button>
                ))}
            </div>
            <button
                onClick={isGameOver}
                className="bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
                Forfeit
            </button>
        </div>
    )
}

export default Game