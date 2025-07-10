import React, { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import GameBoard from '../components/GameBoard';

const GamePage = () => {
    const {
        gameState,
        player,
        initializeGame,
        createPlayer,
        movePlayer
    } = useGame();

    useEffect(() => {
        const start = async () => {
            await initializeGame(10, 10, 20, 2);
            const newPlayer = await createPlayer(0,0,2);
            console.log("Nuevo jugador:", newPlayer);
        };
        start();
    }, []);

    const handleMove = (dir) => {
        if (player) movePlayer(player.id, dir);
    };

    return (
        <div>
            <h2>Game Board</h2>
            <GameBoard boardMatrix={gameState?.boardMatrix} player={player} />
            <div>
                <button onClick={() => handleMove('W')}>↑ Up</button>
                <button onClick={() => handleMove('S')}>↓ Down</button>
                <button onClick={() => handleMove('A')}>← Left</button>
                <button onClick={() => handleMove('D')}>→ Right</button>
            </div>
        </div>
    );
};

export default GamePage;
