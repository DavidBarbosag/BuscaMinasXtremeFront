import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import styles from './JoinForm.module.css';
import layout from './layout/Container.module.css';
import BoxStyles from './layout/BoxClassic.module.css';
import TitleStyles from './layout/Title.module.css';
import ButtonStyles from './layout/Button.module.css';

export default function JoinForm() {
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (roomCode.trim()) {
            console.log('Joining room:', roomCode);
            navigate(`/game/${roomCode}`);
        }
    };

    return (
        <div className={layout.container}>
            <div className={BoxStyles.BoxClassicGlobalCol}>
                <h2 className={TitleStyles.titleGlobal}>Enter Room Code</h2>
                <div className={BoxStyles.BoxClassicRow}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Room Code"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                        />
                        <button type="submit" className={ButtonStyles.xpButton}>Join</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
