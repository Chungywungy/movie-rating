import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LoggedIn() {
    const { currentUser } = useContext(AuthContext);
    const auth = getAuth();

    function handleClick() {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                console.error(error.code);
            });
    }

    return <button onClick={handleClick}>Sign Out</button>;
}

function LoggedOut() {
    const auth = getAuth();
    const navigate = useNavigate();

    function handleClick() {
        navigate('/movie-rating/login');
    }
    return <button onClick={handleClick}>Sign In</button>;
}

export default function ProfileButton() {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <LoggedIn /> : <LoggedOut />;
}
