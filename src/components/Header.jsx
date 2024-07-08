import React, { useState, useEffect } from "react";
import burger from "@assets/burger.svg";
import close from "@assets/close.svg";
import logo from "@assets/logo.png";

function MobileHeader() {
    const [isActive,setIsActive] = useState(false)

    const handleClick = () => {
        if (!isActive) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }
    return (
        
        <header className='mobile-header'>
            <a  className='logo' href="/">
                <img src={logo}/>
            </a>
            <button onClick={handleClick} className='mobile-menu-btn burger'>
                <img src={burger} alt="Menu" />
            </button>

            {isActive ? 

            <nav className="mobile-menu">
                <button onClick={handleClick} className='mobile-menu-btn close'>
                <img src={close} alt="" />
            </button>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/habitats">Habitats</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                <a className="button" href='/connexion'>Se Connecter</a>
            </nav>

            : null
            }
            
        </header>
    );
}

function DesktopHeader() {
    return (
        <header className='desktop-header'>
            <a className='logo' href="/">
                <img src={logo}/>
            </a>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/habitats">Habitats</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            <a className='button' href='/connexion'>Se connecter</a>
        </header>
    );
}

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 850);

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
