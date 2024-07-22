import React, { useState, useEffect } from "react";
import burger from "@assets/burger.svg";
import close from "@assets/close.svg";
import logo from "@assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function MobileHeader() {
    const [isActive, setIsActive] = useState(false);
    const userRole = localStorage.getItem('userRole')


    const handleClick = () => {
        setIsActive(!isActive); // Toggle isActive state
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
        Navigate('/')
    };

    return (
        <header className='mobile-header'>
            <Link className='logo' to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <button onClick={handleClick} className='mobile-menu-btn burger'>
                <img src={burger} alt="Menu" />
            </button>

            {isActive && (
                <nav className="mobile-menu">
                    <button onClick={handleClick} className='mobile-menu-btn close'>
                        <img src={close} alt="Close" />
                    </button>
                    <ul>
                        <li onClick={handleClick}><Link to="/">Accueil</Link></li>
                        <li onClick={handleClick}><Link to="/services">Services</Link></li>
                        <li onClick={handleClick}><Link to="/habitats">Habitats</Link></li>
                        <li onClick={handleClick}><Link to="/contact">Contact</Link></li>
                       {localStorage.getItem('authToken') && <li onClick={handleClick}><Link to={`${userRole}/dashboard`}>Dashboard</Link></li>}

                    </ul>
                    {localStorage.getItem('authToken') ?
                        <Link to='/' className='button' onClick={logout}>Déconnexion</Link> :
                        <Link to='/connexion' className='button' onClick={handleClick}>Se connecter</Link>}
                </nav>
            )}
        </header>
    );
}

function DesktopHeader() {
    const userRole = localStorage.getItem('userRole')


    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
        Navigate('/')

    };

    return (
        <header className='desktop-header'>
            <Link className='logo' to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/habitats">Habitats</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {localStorage.getItem('authToken') && <li><Link to={`${userRole}/dashboard`}>Dashboard</Link></li>}
            </ul>
            {localStorage.getItem('authToken') ?
                <Link to='/' className='button' onClick={logout}>Déconnexion</Link> :
                <Link to='/connexion' className='button'>Se connecter</Link>}
        </header>
    );
}

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken')) 
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 850);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return isMobile ? <MobileHeader /> : <DesktopHeader />;
}

export default Header;
