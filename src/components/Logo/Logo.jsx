import { useNavigate } from 'react-router-dom';
import './Logo.css';

export default function Logo({ to, children }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(to);
    }
    return (
        <h1 className='logo' onClick={handleClick}>
            {children}
        </h1>
    );
}
