import { useEffect, useRef, useState } from "react";

export function useVoiceChat(url = "ws://3.89.27.251:8081/signal-ws") {
    const ws = useRef(null);
    const peerConnection = useRef(null);
    const localStream = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // 1. Abrir WebSocket
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            setConnected(true);
            console.log("WS conectado");
            start();
        };

        ws.current.onclose = () => {
            setConnected(false);
            console.log("WS desconectado");
        };

        ws.current.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            if (!peerConnection.current) return;

            if (data.type === "offer") {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                ws.current.send(JSON.stringify(answer));
            }

            if (data.type === "answer") {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
            }

            if (data.type === "candidate") {
                try {
                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
                } catch (e) {
                    console.error("Error al agregar ICE", e);
                }
            }
        };

        return () => {
            ws.current?.close();
            peerConnection.current?.close();
        };
    }, [url]);

    const start = async () => {
        try {
            localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            peerConnection.current = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            });

            // Enviar audio
            localStream.current.getTracks().forEach((track) => {
                peerConnection.current.addTrack(track, localStream.current);
            });

            // Emitir ICE candidates
            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    ws.current.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
                }
            };

            // (Opcional) reproducir audio remoto
            peerConnection.current.ontrack = (event) => {
                const remoteAudio = document.getElementById("remote-audio");
                if (remoteAudio && event.streams[0]) {
                    remoteAudio.srcObject = event.streams[0];
                }
            };

            // Crear y enviar oferta
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            ws.current.send(JSON.stringify(offer));

        } catch (err) {
            console.error("Error inicializando WebRTC", err);
        }
    };

    return { connected, localStream };
}
