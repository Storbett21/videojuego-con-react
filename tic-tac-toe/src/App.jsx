import { useState } from 'react'
import confetti from "canvas-confetti"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const TURNS = {

  X: "X",
  O: "O"
}


const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {

    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}

    </div>


  )


}
const WINNER_COMBOS = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]

]


function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es un empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{

    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a] 
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkendGame = (newBoard) => {

    return newBoard.every((Square) => Square != null)
  }

  const updateBoard = (index) => {
    // no actualizamos esta posicion si ya tiene algo
    if (board[index] || winner) return
// actualizr el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno 
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkendGame(newBoard)) {
      setWinner(false)
    }
  }



  return (

    <main className='board'>
      <h1> tic tac toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (

              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >

{board[index]}
              </Square>


            )


          })
        }

      </section>
      <section className='turn'>
        <Square isSelected={turn == TURNS.X}   >
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O} >{TURNS.O}
        </Square>

      </section>
      {
        winner != null && (

          <section className='winner'>
            <div className='text'>
              <h2>
                {winner == false
                ? 'empate'
                : 'GANO:'
                }
              </h2>

              <header className="win">
                {winner && <Square> {winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de Nuevo</button>
              </footer>
            </div>
          </section>


        )
      }

    </main>


  )







}

export default App
