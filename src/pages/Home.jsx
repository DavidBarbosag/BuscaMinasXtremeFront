import HomeButtons from '../components/HomeButtons';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleJoin = () => navigate('/join');
    const handleCreate = () => navigate('/create');

    return <HomeButtons onJoin={handleJoin} onCreate={handleCreate} />;
}
