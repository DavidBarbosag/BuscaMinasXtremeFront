import React, { useEffect, useRef } from "react";
import { useVoiceChat } from "../hooks/useVoiceChat.js";

export default function VoiceCallPage() {
    const { connected, localStream } = useVoiceChat();
    const localAudioRef = useRef();

    useEffect(() => {
        if (localStream.current && localAudioRef.current) {
            localAudioRef.current.srcObject = localStream.current;
        }
    }, [localStream]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Prueba de llamada de voz</h1>
            <p>Conexión WebSocket: {connected ? "Activa" : "Inactiva"}</p>

            <div>
                <h3>Tu audio</h3>
                <audio ref={localAudioRef} autoPlay muted />
            </div>

            <div>
                <h3>Audio remoto</h3>
                <audio id="remote-audio" autoPlay />
            </div>
        </div>
    );
}
