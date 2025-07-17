import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export function useGame() {
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const stompClientRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            setIsConnected(true);
            stompClientRef.current = client;

            client.subscribe('/topic/state', message => {
                const state = JSON.parse(message.body);
                setGameState(state);
            });

            client.subscribe('/topic/playerCreated', message => {
                const newPlayer = JSON.parse(message.body);
                setPlayer(newPlayer);
            });
        });

        return () => {
            client.disconnect();
            setIsConnected(false);
        };
    }, []);

    const sendMessage = (destination, body) => {
        if (stompClientRef.current?.connected) {
            stompClientRef.current.publish({
                destination,
                body: JSON.stringify(body),
            });
        }
    };

    const initializeGame = (rows, cols, globalMines, minesPerPlayer) => {
        sendMessage('/app/init', { rows, cols, globalMines, minesPerPlayer });
    };

    const createPlayer = (x, y, mines) => {
        sendMessage('/app/createPlayer', { x, y, mines });
    };

    const movePlayer = (playerId, direction) => {
        if (!playerId) {
            console.warn('No playerId provided for move');
            return;
        }
        sendMessage('/app/move', { playerId, direction });
    };

    const flagElement = (playerId, direction) => {
        if (!playerId) {
            console.warn('No playerId provided for flag');
            return;
        }
        sendMessage('/app/flag', { playerId, direction });
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
