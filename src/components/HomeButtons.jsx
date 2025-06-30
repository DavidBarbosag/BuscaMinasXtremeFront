import layout from './layout/Container.module.css';
import BoxStyles from './layout/BoxClassic.module.css';
import TitleStyles from './layout/Title.module.css';
import ButtonStyles from './layout/Button.module.css';

export default function HomeButtons({ onJoin, onCreate }) {
    return (
        <div className={layout.container}>
            <div className={BoxStyles.BoxClassicGlobalCol}>
                <h1 className={TitleStyles.titleGlobal}>Buscaminas Xtreme</h1>
                <div className={BoxStyles.BoxClassicRow}>
                    <button className={ButtonStyles.xpButton} onClick={onJoin}>Join Room</button>
                    <button className={ButtonStyles.xpButton} onClick={onCreate}>Create Room</button>
                </div>
            </div>
        </div>
    );
}
