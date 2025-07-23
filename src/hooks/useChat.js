import { useEffect, useRef, useState } from "react";

export function useChat(url = "ws://34.224.222.56:8081/signal-ws") {
    const ws = useRef(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => setConnected(true);
        ws.current.onclose = () => setConnected(false);

        ws.current.onmessage = (event) => {
            setMessages((msgs) => [...msgs, { from: "remote", text: event.data }]);
        };

        return () => ws.current?.close();
    }, [url]);

    const sendMessage = (text) => {
        if (ws.current && connected) {
            ws.current.send(text);
            setMessages((msgs) => [...msgs, { from: "me", text }]);
        }
    };

    return { connected, messages, sendMessage };
}