import { useState } from 'react';
import layout from './layout/Container.module.css';
import BoxStyles from './layout/BoxClassic.module.css';
import TitleStyles from './layout/Title.module.css';
import ButtonStyles from './layout/Button.module.css';
import styles from './CreateRoomForm.module.css';

export default function CreateRoomForm() {
    const [players, setPlayers] = useState('2');
    const [mode, setMode] = useState('Classic');
    const [bombs, setBombs] = useState('');

    return (
        <div className={layout.container}>
            <div className={BoxStyles.BoxClassicGlobalCol}>
                <h1 className={TitleStyles.titleGlobal}>Create Room</h1>

                <div className={BoxStyles.BoxClassicCol}>
                    {/* Fila de selectores */}
                    <div className={styles.row}>
                        <label className={styles.label}>
                            Players:
                            <select
                                className={styles.select}
                                value={players}
                                onChange={(e) => setPlayers(e.target.value)}
                            >
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </label>

                        <label className={styles.label}>
                            Mode:
                            <select
                                className={styles.select}
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <option value="Classic">Classic</option>
                                <option value="Timed">Timed</option>
                                <option value="Extreme">Extreme</option>
                            </select>
                        </label>

                        <label className={styles.label}>
                            Bombs:
                            <input
                                type="number"
                                className={styles.input}
                                value={bombs}
                                onChange={(e) => setBombs(e.target.value)}
                                placeholder="Bombs"
                                min="1"
                            />
                        </label>
                    </div>

                    {/* Botón en una línea separada debajo */}
                    <div className={styles.buttonRow}>
                        <button className={ButtonStyles.xpButton}>Create Room</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
