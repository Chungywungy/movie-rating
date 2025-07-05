import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState, useContext } from 'react';
import { getLoginErrorMessage } from './LoginErrors';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const loginEmailPassword = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate('/movie-rating/');
                setError('');
            })
            .catch((error) => {
                setError(error.code);
            });
    };

    return (
        <div className='auth-container'>
            <h2>Login</h2>
            <form onSubmit={loginEmailPassword}>
                <label>
                    {'Email'}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        name='txtEmail'
                    ></input>
                </label>
                <label>
                    {'Password'}
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        name='txtPassword'
                    ></input>
                </label>
                <p className='error'>{error && getLoginErrorMessage(error)}</p>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
