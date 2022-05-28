import React, {useState} from "react";
import PrometheusBoard from "../PrometheusBoard/PrometheusBoard";
import InitialGameState from "../../logic/InitialGameState";
import Players from "../../logic/Players";

const OnlinePrometheusBoard = () => {
    const [inProgress, setInProgress] = useState(false);
    const [playerOneSpherePlaced, setPlayerOneSpherePlaced] = useState(false);
    const [playerTwoSpherePlaced, setPlayerTwoSpherePlaced] = useState(false);
    // Stringify hack to deep clone InitialGameState - avoids mutation.
    // TODO: Use lodash here instead?
    const [gameState, setGameState] = useState(JSON.parse(JSON.stringify(InitialGameState)));
    const [winner, setWinner] = useState(null);
    const [turn, setTurn] = useState(Players.PLAYER_ONE);

    const inProgressWithSpheresPlaced = inProgress && playerOneSpherePlaced && playerTwoSpherePlaced;

    const resetGame = () => {
        setInProgress(true);
        setWinner(null);
        setGameState(JSON.parse(JSON.stringify(InitialGameState)));
        setPlayerOneSpherePlaced(false);
        setPlayerTwoSpherePlaced(false);
    }

    return (
        <PrometheusBoard inProgress={inProgress} setInProgress={setInProgress}
                         playerOneSpherePlaced={playerOneSpherePlaced} playerTwoSpherePlaced={playerTwoSpherePlaced}
                         setPlayerOneSpherePlaced={setPlayerOneSpherePlaced}
                         setPlayerTwoSpherePlaced={setPlayerTwoSpherePlaced}
                         gameState={gameState} setGameState={setGameState} turn={turn} setTurn={setTurn}
                         setWinner={setWinner}/>
    )
}

export default OnlinePrometheusBoard;
