import './NavBarButton.css';
import { useNavigate } from 'react-router-dom';

export default function NavBarButton({ className, to, children }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(to);
    }

    return (
        <>
            <button
                className={`nav-bar-button ${className}`}
                onClick={handleClick}
            >
                {children}
            </button>
        </>
    );
}
