import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export function useGame(gameId) {
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const stompClientRef = useRef(null);

    useEffect(() => {
        if (!gameId) return;
        console.log("Conectando al WebSocket con gameId:", gameId);
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            setIsConnected(true);
            stompClientRef.current = client;

            client.subscribe(`/topic/game/${gameId}`, message => {
                const state = JSON.parse(message.body);
                setGameState(state);

                const storedId = localStorage.getItem(`playerId-${gameId}`);
                if (storedId) {
                    const foundPlayer = state.players?.find(p => p.id === storedId);
                    if (foundPlayer) {
                        setPlayer(foundPlayer);
                    }
                }
            });

            client.subscribe(`/topic/game/${gameId}/playerCreated`, message => {
                const newPlayer = JSON.parse(message.body);

                const storedId = localStorage.getItem(`playerId-${gameId}`);
                if (!storedId) {
                    localStorage.setItem(`playerId-${gameId}`, newPlayer.id);
                    setPlayer(newPlayer);
                }
            });
        });

        return () => {
            client.disconnect();
            setIsConnected(false);
        };
    }, [gameId]);

    const sendMessage = (destination, body) => {
        if (stompClientRef.current?.connected) {
            stompClientRef.current.publish({
                destination,
                body: JSON.stringify(body),
            });
        }
    };

    const initializeGame = (gameId, rows, cols, globalMines, minesPerPlayer) => {
        console.log(`[Frontend] Enviando init a /app/init/${gameId}`, { rows, cols, globalMines, minesPerPlayer });
        sendMessage(`/app/init/${gameId}`, { rows, cols, globalMines, minesPerPlayer });
    };

    const createPlayer = (gameId, x, y, mines) => {
        sendMessage(`/app/createPlayer/${gameId}`, { x, y, mines });
    };

    const movePlayer = (gameId, playerId, direction) => {
        if (!playerId) return;
        sendMessage(`/app/move/${gameId}`, { playerId, direction });
    };

    const flagElement = (gameId, playerId, direction) => {
        if (!playerId) return;
        sendMessage(`/app/flag/${gameId}`, { playerId, direction });
    };

    const placeMine = (gameId, playerId, direction) => {
        if (!playerId) return;
        sendMessage(`/app/placeMine/${gameId}`, { playerId, direction });
    };

    const changeMode = (gameId, playerId, mode) => {
        if (!playerId) return;
        sendMessage(`/app/changeMode/${gameId}`, { playerId, mode });
    }

    return {
        gameState,
        player,
        isConnected,
        initializeGame,
        createPlayer,
        movePlayer,
        flagElement,
        placeMine,
        changeMode,
    };
}
