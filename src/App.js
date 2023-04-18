//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from "react";

//data
import { wordsList } from "./data/words";

//components
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';

const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
]

function App() {
    const [keyboard, setKeyboard] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""))
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words] = useState(wordsList);
    
    const [pickedWord, setPickedWord] = useState("")
    const [pickedCategory, setPickedCategory] = useState("")
    const [letters, setLetters] = useState([])

    const [guessedLetters, setGuessedLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [guesses, setGuesses] = useState(0)
    const [score, setScore] = useState(0)

    const pickWordAndCategory = useCallback(() => {
        //pick random category
        const categories = Object.keys(words)
        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

        //pick random word from category
        const word = words[category][Math.floor(Math.random() * Object.keys(categories).length)]

        return { word, category }
    }, [words])

    const startGame = useCallback(() => {
        setGuesses(0)
        setLetters([])
        setGuessedLetters([])
        setWrongLetters([])
        setKeyboard("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""))
        const { word, category } = pickWordAndCategory()

        //create an array of letters
        let wordLetters = word.split("")
        wordLetters = wordLetters.map((letter) => letter.toLowerCase())

        setPickedWord(word)
        setPickedCategory(category)
        setLetters(wordLetters)
        setGameStage(stages[1].name)

    }, [pickWordAndCategory])

    const verifyLetter = (letter) => {
        const normalizedLetter = letter.toLowerCase()

        if(letters.includes(normalizedLetter)) {
            setGuessedLetters([...guessedLetters, letter])
        } else {
            setWrongLetters([...wrongLetters, letter])
            setGuesses(guesses+1)
        }
    }

    //check if the game is over
    useEffect(() => {
        if(guesses >= 6) {
            isGameOver()
            clearGame()
        }
    })

    // check win condition
    useEffect(() => {
        const uniqueLetters = [... new Set(letters)]
        if(gameStage !== stages[1].name) return
        if(guessedLetters.length === uniqueLetters.length && guesses < 6) {
            const score = 100 - (guesses*10)
            setScore((actualScore) => actualScore += score)
            startGame()
        }
    }, [guessedLetters, letters, startGame])

    const clearGame = () => {
        setGuesses(0)
        setPickedCategory("")
        setPickedWord("")
        setLetters([])
        setGuessedLetters([])
        setWrongLetters([])
        setScore(0)
    }

    const isGameOver = () => {
        setGameStage(stages[2].name)
    }

    const backToStartScreen = () => {
        setGameStage(stages[0].name)
        setScore(0)
    }
    return (
        <div className="App">
            {gameStage === 'start' && <StartScreen startGame={startGame}/>}
            {gameStage === 'game' && (
                <Game 
                    isGameOver={isGameOver} 
                    pickedWord={pickedWord} 
                    pickedCategory={pickedCategory} 
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}
                    verifyLetter={verifyLetter}
                    keyboard={keyboard}
                    setKeyboard={setKeyboard}
                />
            )}
            {gameStage === 'end' && <GameOver backToStartScreen={backToStartScreen} score={score}/>}
        </div>
    );
}

export default App;
