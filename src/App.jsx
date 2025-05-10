import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='movie-rating/' element={<NavBar />}>
                    <Route index element={<Home />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
