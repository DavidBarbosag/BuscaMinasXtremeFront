import React from "react";
import { useGame } from "../hooks/useGame";
import { useParams } from "react-router-dom";

import BoxStyles from "./layout/BoxClassic.module.css";
import TitleStyles from "./layout/Title.module.css";

const ScoreBoard = () => {
    const { gameId } = useParams();
    const { gameState } = useGame(gameId);

    if (!gameState || !gameState.players || gameState.players.length === 0) {
        return null;
    }

    return (
        <div className={BoxStyles.BoxClassicGlobalCol}>
            <h2 className={TitleStyles.titleGlobal}>Score Board</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Player</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Score</th>
                </tr>
                </thead>
                <tbody>
                {gameState.players.map((player) => (
                    <tr key={player.id} style={{ borderTop: '1px solid #ccc' }}>
                        <td style={{ padding: '8px' }}>{player.symbol}</td>
                        <td style={{ padding: '8px' }}>{player.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScoreBoard;
