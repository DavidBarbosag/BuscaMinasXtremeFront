import React from "react";
import { useLocation } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import LobbyChat from "../components/LobbyChat";

const LostLobby = () => {
    const location = useLocation();
    const state = location.state || {};
    const { boardMatrix, player } = state;

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f0f0f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ marginBottom: 32 }}>
                <GameBoard boardMatrix={boardMatrix} player={player} />
            </div>
            <LobbyChat wsUrl="ws://3.89.27.251:8081/signal-ws" />
        </div>
    );
};

export default LostLobby;