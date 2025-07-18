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
                console.log("Mensaje recibido:", message.body);
                const state = JSON.parse(message.body);
                setGameState(state);
            });

            client.subscribe(`/topic/game/${gameId}/playerCreated`, message => {
                const newPlayer = JSON.parse(message.body);
                setPlayer(newPlayer);
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


    return {
        gameState,
        player,
        isConnected,
        initializeGame,
        createPlayer,
        movePlayer,
        flagElement,
    };
}
