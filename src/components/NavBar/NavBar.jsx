import { Outlet } from 'react-router-dom';
import NavBarButton from '../NavBarButton/NavBarButton';
import './NavBar.css';
import Logo from '../Logo/Logo';

export default function NavBar() {
    return (
        <>
            <nav className='nav-bar'>
                <div className='nav-item left'>
                    <div>
                        <Logo to='/movie-rating'>Chungywungy.com</Logo>
                    </div>
                </div>
                <div className='nav-item center'>
                    <div>
                        <NavBarButton
                            to='/movie-rating/'
                            className='button-primary'
                        >
                            Home
                        </NavBarButton>
                        <NavBarButton
                            to='/movie-rating/'
                            className='button-secondary'
                        >
                            Ratings
                        </NavBarButton>
                    </div>
                </div>
                <div className='nav-item right'>
                    <div>
                        <a href="https://chungywungy.github.io" target='blank'>
                        Lol</a>
                    </div>
                </div>
            </nav>
            <Outlet></Outlet>
        </>
    );
}
