import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from './user/UserNav';
import AdminNav from './admin/AdminNav';

const Nav = () => {
    const [role, setRole] = useState('user');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const navRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setRole(user.role);
        }
    }, []);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDarkMode) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    }, []);

    return (
        <header 
            className={`${menuOpen ? 'w-64' : 'w-16'} z-50 h-screen fixed duration-300 
                       transition-all ease-in-out top-0 left-0 border-r border-gray-200 
                       dark:border-gray-700`}
            ref={navRef}
        >
            {role === 'admin' ? (
                <AdminNav 
                    setMenuOpen={setMenuOpen} 
                    menuOpen={menuOpen} 
                    isDarkMode={isDarkMode} 
                    toggleDarkMode={toggleDarkMode} 
                />
            ) : (
                <UserNav 
                    setMenuOpen={setMenuOpen} 
                    menuOpen={menuOpen} 
                    isDarkMode={isDarkMode} 
                    toggleDarkMode={toggleDarkMode} 
                />
            )}
        </header>
    );
};

export default Nav;
