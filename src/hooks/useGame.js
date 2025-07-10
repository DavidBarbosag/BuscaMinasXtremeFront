import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/gameManager';

export const useGame = () => {
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null); // Guardamos el jugador creado

    //  Inicializa el juego con los parámetros dados
    const initializeGame = async (rows, cols, globalMines, minesPerPlayer) => {
        try {
            await axios.post(`${API_URL}/init`, null, {
                params: { rows, cols, globalMines, minesPerPlayer }
            });
            await fetchGameState();
        } catch (err) {
            console.error('Error initializing game:', err);
        }
    };

    //  Crea un nuevo jugador en una posición
    const createPlayer = async (x, y, mines) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/gameManager/player?mines=${mines}`,
                {
                    x: x,
                    y: y
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            setPlayer(response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating player:", error);
            throw error;
        }
    };

    // 🔄 Refresca el estado del juego desde el backend
    const fetchGameState = async () => {
        try {
            const res = await axios.get(`${API_URL}/state`);
            setGameState(res.data);
        } catch (err) {
            console.error('Error fetching game state:', err);
        }
    };

    // 🔁 Mueve al jugador en una dirección ('W', 'A', 'S', 'D')
    const movePlayer = async (playerId, direction) => {
        try {
            await axios.post(`${API_URL}/move`, null, {
                params: { playerId, direction },
            });
            await fetchGameState(); // Refresca después de mover
        } catch (err) {
            console.error('Error moving player:', err);
        }
    };

    // Efecto para refrescar automáticamente el estado del juego cada segundo
    useEffect(() => {
        fetchGameState();
        const interval = setInterval(fetchGameState, 1000);
        return () => clearInterval(interval);
    }, []);

    return {
        gameState,
        player,
        initializeGame,
        createPlayer,
        movePlayer
    };
};
