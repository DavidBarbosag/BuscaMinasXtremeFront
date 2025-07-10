// src/components/GameBoard.jsx
import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { useGame } from "../hooks/useGame";

const GameBoard = ({ player }) => {
    const { gameState } = useGame(); // ✅ Usa el hook directamente
    const [cellMatrix, setCellMatrix] = useState([]);
    const [hasFlooded, setHasFlooded] = useState(false);

    // Construir la matriz visual con celdas cubiertas inicialmente
    useEffect(() => {
        if (gameState?.boardMatrix) {
            const matrix = gameState.boardMatrix.map(row =>
                row.map(cellContent => ({
                    state: "covered",
                    content: isNaN(cellContent) ? cellContent : Number(cellContent)
                }))
            );
            setCellMatrix(matrix);
            setHasFlooded(false); // Permitir flood fill con nuevo estado
        }
    }, [gameState]);

    // Flood fill para descubrir celdas vacías desde la posición del jugador
    useEffect(() => {
        if (!hasFlooded && player?.position && cellMatrix.length > 0) {
            const visited = new Set();

            const isInside = (x, y) =>
                x >= 0 && y >= 0 && x < cellMatrix.length && y < cellMatrix[0].length;

            const floodFill = (x, y) => {
                if (!isInside(x, y)) return;
                const key = `${x},${y}`;
                if (visited.has(key)) return;
                visited.add(key);

                setCellMatrix(prev => {
                    const newMatrix = prev.map(row => row.map(cell => ({ ...cell })));
                    const cell = newMatrix[x][y];

                    if (cell.state === "discovered") return prev;

                    cell.state = "discovered";

                    if (cell.content === 0) {
                        floodFill(x + 1, y);
                        floodFill(x - 1, y);
                        floodFill(x, y + 1);
                        floodFill(x, y - 1);
                    }

                    return newMatrix;
                });
            };

            const { x, y } = player.position;
            floodFill(x, y);
            setHasFlooded(true);
        }
    }, [player, cellMatrix, hasFlooded]);

    return (
        <div>
            {cellMatrix.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            cell={cell}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
