import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getRegisterErrorMessage } from '../Login/LoginErrors';
import React from 'react';
import { useState } from 'react';
import './Register.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const registerEmailPassword = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
                console.log(user);
                setError('');
            })
            .catch((error) => {
                setError(error.code);
            });
    };

    return (
        <div className='auth-container'>
            <h2>Register</h2>
            <form onSubmit={registerEmailPassword}>
                <label>
                    {'Email'}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='text'
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
                <p>{error && getRegisterErrorMessage(error)}</p>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
