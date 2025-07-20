import React, { useEffect, useState } from 'react';
import { useGame } from '../hooks/useGame';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import GameBoard from '../components/GameBoard';


import layout from '../components/layout/Container.module.css';
import box from '../components/layout/BoxClassic.module.css';
import title from '../components/layout/Title.module.css';


import ScoreBoard from "../components/ScoreBoard.jsx";

const GamePage = () => {
    const { gameId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { bombs, mapSize, minesPerPlayer } = location.state || {};

    const [gameInitialized, setGameInitialized] = useState(false);

    const {
        gameState,
        player,
        isConnected,
        initializeGame,
        createPlayer,
        movePlayer,
        flagElement
    } = useGame(gameId);

    useEffect(() => {
        console.log('Player ID actualizado:', player?.id);
    }, [player?.id]);

    useEffect(() => {
        return () => {
            localStorage.removeItem(`playerId-${gameId}`);
        };
    }, []);


    useEffect(() => {
        if (gameState?.status === 'FINISHED' && gameState?.winnerId) {
            const winner = gameState.winnerId;
            const isYou = winner === player?.id;
            const message = isYou
                ? 'You Win! Congratulations!'
                : `Player ${winner} has won the game!`;
            alertXpStyle(message);
        }
    }, [gameState?.status]);


    useEffect(() => {
        if (isConnected && !gameInitialized) {
            if (bombs && mapSize && minesPerPlayer) {
                initializeGame(gameId, mapSize, mapSize, bombs, minesPerPlayer);
                setGameInitialized(true);
            } else {
                setGameInitialized(true);
            }
        }
    }, [isConnected, gameInitialized]);

    useEffect(() => {
        if (gameInitialized && isConnected) {
            const storedId = localStorage.getItem(`playerId-${gameId}`);
            if (!storedId && !player?.id) {
                createPlayer(gameId, 0, 0, 2);
            }
        }
    }, [gameInitialized, isConnected, player?.id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!player) return;

            const key = e.key.toLowerCase();
            if (['w', 'a', 's', 'd'].includes(key)) {
                movePlayer(gameId, player.id, key.toUpperCase());
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
                    e.preventDefault();
                    flagElement(gameId, player.id, 'u');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    flagElement(gameId, player.id, 'd');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    flagElement(gameId, player.id, 'l');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    flagElement(gameId, player.id, 'r');
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('keydown', handleFlag, { passive: false });
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

                        <div style={{
                            marginTop: '1rem',
                            padding: '0.75rem 1rem',
                            border: '2px solid #808080',
                            backgroundColor: '#D4D0C8',
                            boxShadow: 'inset 2px 2px #FFFFFF, inset -2px -2px #808080',
                            borderRadius: '4px',
                            fontFamily: 'Tahoma, Verdana, sans-serif',
                            textAlign: 'center',
                            fontSize: '18px',
                            color: 'black',
                            textShadow: '1px 1px 0 #ffffff'
                        }}>
                            Game ID: <span style={{ fontWeight: 'bold' }}>{gameId}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

function alertXpStyle(message) {
    const alertBox = document.createElement('div');
    alertBox.innerText = message;

    Object.assign(alertBox.style, {
        position: 'fixed',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#D4D0C8',
        border: '2px solid #808080',
        boxShadow: '4px 4px #404040',
        padding: '20px 30px',
        zIndex: 9999,
        fontFamily: 'Tahoma, sans-serif',
        color: 'black',
        fontSize: '18px',
        textAlign: 'center',
        textShadow: '1px 1px 0 #ffffff',
        borderRadius: '4px',
        animation: 'fadeInScale 0.4s ease-in-out',
    });

    const okButton = document.createElement('button');
    okButton.innerText = 'OK';
    Object.assign(okButton.style, {
        marginTop: '15px',
        padding: '5px 15px',
        fontSize: '16px',
        border: '1px solid #404040',
        backgroundColor: '#E4E4E4',
        cursor: 'pointer',
        boxShadow: 'inset 1px 1px white, inset -1px -1px gray',
    });

    okButton.onclick = () => document.body.removeChild(alertBox);

    alertBox.appendChild(document.createElement('br'));
    alertBox.appendChild(okButton);

    document.body.appendChild(alertBox);
}

export default GamePage;
