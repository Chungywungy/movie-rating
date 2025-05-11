import { Outlet } from 'react-router-dom';
import NavBarButton from '../NavBarButton/NavBarButton';
import './NavBar.css';
import Logo from '../Logo/Logo';
import ProfileButton from '../ProfileButton/ProfileButton';

export default function NavBar() {
    return (
        <>
            <nav className='nav-bar'>
                <div className='nav-item left'>
                    <div>
                        <Logo to='/movie-rating'>Fawaz.com</Logo>
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
                            to='/movie-rating/login'
                            className='button-secondary'
                        >
                            Login
                        </NavBarButton>
                    </div>
                </div>
                <div className='nav-item right'>
                    <div>
                        <ProfileButton></ProfileButton>
                    </div>
                </div>
            </nav>
            <Outlet></Outlet>
        </>
    );
}
