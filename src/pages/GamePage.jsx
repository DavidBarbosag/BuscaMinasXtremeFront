// src/pages/GamePage.jsx
import React, { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import { useLocation, useNavigate } from 'react-router-dom';
import GameBoard from '../components/GameBoard';


import layout from '../components/layout/Container.module.css';
import box from '../components/layout/BoxClassic.module.css';
import title from '../components/layout/Title.module.css';


import ScoreBoard from "../components/ScoreBoard.jsx";

const GamePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        gameState,
        player,
        isConnected,
        initializeGame,
        createPlayer,
        movePlayer,
        flagElement
    } = useGame();

    useEffect(() => {
        if (isConnected) {
            const { bombs, mapSize, minesPerPlayer } = location.state || {};

            if (!bombs || !mapSize || !minesPerPlayer) {
                navigate('/create');
                return;
            }

            initializeGame(mapSize, mapSize, bombs, minesPerPlayer);
            createPlayer(0, 0, 2);
        }
    }, [isConnected]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!player) return;

            const key = e.key.toLowerCase();
            if (['w', 'a', 's', 'd'].includes(key)) {
                movePlayer(player.symbol, key.toUpperCase());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [player, movePlayer]);

    useEffect(() => {
        const handleFlag = (e) => {
            if (!player) return;

            const key = e.key;

            switch (key) {
                case 'ArrowUp':
                    flagElement(player.symbol, 'u');
                    break;
                case 'ArrowDown':
                    flagElement(player.symbol, 'd');
                    break;
                case 'ArrowLeft':
                    flagElement(player.symbol, 'l');
                    break;
                case 'ArrowRight':
                    flagElement(player.symbol, 'r');
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('keydown', handleFlag);
        return () => window.removeEventListener('keydown', handleFlag);
    }, [player, flagElement]);

    return (
        <div className={layout.container}>
            <div className={box.BoxClassicGlobalCol}>
                <h1 className={title.titleGlobal}>Game Room</h1>

                <div className={box.BoxClassicGlobalRow}>
                    <div className={box.BoxClassicCol} style={{ flex: 3 }}>
                        <GameBoard boardMatrix={gameState?.boardMatrix} player={player} />
                    </div>
                    <div className={box.BoxClassicCol} style={{ flex: 1 }}>
                        <ScoreBoard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
