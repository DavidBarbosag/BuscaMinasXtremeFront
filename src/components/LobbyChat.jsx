import React, { useState } from "react";
import { useChat } from "../hooks/useChat";

const LobbyChat = ({
                       wsUrl = "ws://3.89.27.251:8081/signal-ws",
                       onInputFocus = () => {},
                       onInputBlur = () => {}
                   }) => {
    const { connected, messages, sendMessage } = useChat(wsUrl);
    const [input, setInput] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput("");
        }
    };

    const lastMessages = messages.slice(-5);

    return (
        <div style={{ maxWidth: 400, margin: "20px auto", border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
            <h2>Lobby de Chat</h2>
            <div style={{ minHeight: 120, maxHeight: 150, overflowY: "auto", marginBottom: 16, background: "#f9f9f9", padding: 8 }}>
                {lastMessages.map((msg, idx) => (
                    <div key={idx} style={{ textAlign: msg.from === "me" ? "right" : "left" }}>
                        <span style={{ background: msg.from === "me" ? "#d1ffd6" : "#e6e6e6", borderRadius: 4, padding: "4px 8px", display: "inline-block", margin: "2px 0" }}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    placeholder={connected ? "Escribe un mensaje..." : "Conectando..."}
                    disabled={!connected}
                    style={{ flex: 1, padding: 8 }}
                />
                <button type="submit" disabled={!connected || !input.trim()}>Enviar</button>
            </form>
            {!connected && <div style={{ color: "red", marginTop: 8 }}>Desconectado del chat</div>}
        </div>
    );
};

export default LobbyChat;