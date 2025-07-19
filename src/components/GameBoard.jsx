// src/components/GameBoard.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cell from "./Cell";
import { useGame } from "../hooks/useGame";

const GameBoard = () => {
    const { gameId } = useParams();
    const { gameState } = useGame(gameId);
    const [cellMatrix, setCellMatrix] = useState([]);

    useEffect(() => {
        if (!gameState?.boardMatrix) return;

        const parsedMatrix = gameState.boardMatrix.map(row =>
            row.map(cell => {
                if (!cell) return { state: "unknown", content: "?" };

                if (cell.startsWith("M")) {

                    if (cell === "ME") {
                        return {type: "mine", state: "covered", content: ""};
                    } else if (cell === "MF") {
                        return {type: "mine", state: "flagged", content: ""};
                    } else {
                        return {type: "mine", state: "revealed", content: ""};
                    }
                }

                if (cell.startsWith("P")) {
                    // Player
                    return { state: "player", content: cell };
                }

                if (cell.startsWith("T")) {
                    const number = cell[1]; // T0, T1, T2...
                    const flagged = cell.includes("F");
                    const revealed = cell.endsWith("R");

                    return {
                        state: flagged
                            ? "flagged"
                            : revealed
                                ? "revealed"
                                : "covered",
                        content: revealed ? number : ""
                    };
                }



                return { state: "unknown", content: "?" };
            })
        );

        setCellMatrix(parsedMatrix);
    }, [gameState]);

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
