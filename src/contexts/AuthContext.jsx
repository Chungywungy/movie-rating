import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const INITIAL_STATE = {
    currentUser: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        const auth = getAuth();
        const observer = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}
