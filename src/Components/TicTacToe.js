import React, { useEffect, useState } from 'react'
import Board from './Board'
import GamePver from './GamePver'
import { GameState } from './GameState'
import Reset from './Reset'
import gameOverSoundAsset from '../Sounds/negative.wav'  
import clickSoundAsset  from '../Sounds/src_sounds_click.wav'
import resetSoundAsset from '../Sounds/src_sounds_game_over.wav'
import ConfettiAnimation from './ConfettiAnimation'



const gameOverSound = new Audio(gameOverSoundAsset)
gameOverSound.volume=0.2
const clickSound = new Audio(clickSoundAsset)
clickSound.volume=0.5

const PLAYER_X ="X"
const PLAYER_O ="O"

const winningCombination = [
  //on rows
  { combo:[0,1,2], strikeClass:"strike-row-1"},
  { combo:[3,4,5], strikeClass:"strike-row-2"},
  { combo:[6,7,8], strikeClass:"strike-row-3"},

  //for columns

  { combo:[0,3,6], strikeClass:"strike-column-1"},
  { combo:[1,4,7], strikeClass:"strike-column-2"},
  { combo:[2,5,8], strikeClass:"strike-column-1"},

  //on diagnolly

  { combo:[0,4,8], strikeClass:"strike-diagnol-1"},
  { combo:[2,4,6], strikeClass:"strike-diagnol-2"},


]

function TicTacToe() {

  //.....
  

    const [tiles,setTiles]=useState(Array(9).fill(null));

    //create a state to player x turns
    const [playerTurn,setPlayerTurn] = useState(PLAYER_X)

    //create a state for strike class
    const [strikeClass,setStrikeClass] = useState()

    //game state
    const [gameState,setGameState] = useState(GameState.inProgress)

    // State to control the confetti animation
  const [playConfetti, setPlayConfetti] = useState(false);

  // State for whose turn it is
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);

  let confettiTimeout;

    //create a use effect to get winner

    const checkWinner=(tiles,setStrikeClass,setGameState)=>{
      // console.log('checkWinner');
      for(const {combo, strikeClass} of winningCombination){
        const tileValue1 = tiles[combo[0]]
        const tileValue2 = tiles[combo[1]]
        const tileValue3 = tiles[combo[2]]

        if( tileValue1 != null && tileValue1 == tileValue2 && tileValue1 == tileValue3 ){
          setStrikeClass(strikeClass);
          if(tileValue1 == PLAYER_X){
            setGameState(GameState.playerXWins)
          }
          else{
            setGameState(GameState.playerOWins)

          }
          return
        }

 


      }
      const areAllTilesFilledIn = tiles.every((tile) => tile !== null)
      if(areAllTilesFilledIn){
        setGameState(GameState.draw)
      }
    }

    const handleReset=()=>{
      // console.log('reset');
      setGameState(GameState.inProgress)
      setTiles(Array(9).fill(null))
      setPlayerTurn(PLAYER_X)
      setStrikeClass(null)
       // Reset confetti animation
  setPlayConfetti(false);
  // Clear any timeout set for confetti animation
  clearTimeout(confettiTimeout);
      

    }

    

    useEffect(()=>{
      checkWinner(tiles,setStrikeClass,setGameState)
    },[tiles])

    useEffect(()=>{
      if(tiles.some((tile)=>tile !== null)){
        clickSound.play();
      }
    },[tiles])

    useEffect(()=>{
      if(gameState != GameState.inProgress){
        gameOverSound.play()
      }
    },[gameState])

    useEffect(()=>{
      setCurrentPlayer(playerTurn);

    },[playerTurn])

    useEffect(() => {
      // When a player wins, trigger the confetti animation
      if (gameState === GameState.playerXWins || gameState === GameState.playerOWins) {
        setPlayConfetti(true);
      }
    }, [gameState]);

   


    const handleTileClick=(index)=>{
        // console.log(index);

        if(gameState != GameState.inProgress){
          return
        }

        if(tiles[index]!==null){
          return
        }
        const newTiles = [...tiles]
        newTiles[index]=playerTurn
        setTiles(newTiles)
        if(playerTurn==PLAYER_X){
          setPlayerTurn(PLAYER_O)
        }
        else{
          setPlayerTurn(PLAYER_X)
        }

        // Update current player
  setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O:PLAYER_X);



    };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      {gameState===GameState.inProgress&&<p>Player {currentPlayer} turns</p>}
      <Board 
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      >

      </Board>
      
      <GamePver gameState={gameState}></GamePver>
      <div className='res'><Reset gameState={gameState} onReset={handleReset}></Reset></div>
      <ConfettiAnimation play={playConfetti} ></ConfettiAnimation>
    </div>
  )
}

export default TicTacToe
