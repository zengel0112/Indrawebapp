import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import PropTypes from 'prop-types';
import { useState } from 'react';

// Get initials from name
const getInitials = (name) => {
  return name
    ?.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase() || 'U';
};

const UserNav = ({ menuOpen, setMenuOpen, toggleDarkMode, isDarkMode }) => {
    const location = useLocation();
    const [profileData] = useState(() => {
        const savedData = localStorage.getItem('profileData');
        return savedData ? JSON.parse(savedData) : {
            name: "User",
            avatar: null
        };
    });

    return (
        <motion.nav className="w-full h-full bg-white dark:bg-gray-800 flex flex-col 
                              items-center justify-between py-4">
            {/* Profile Section */}
            <div className="w-full px-3">
                <Link to="/profile" 
                      className="flex items-center justify-center">
                    {profileData.avatar ? (
                        <img 
                            src={profileData.avatar} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full 
                                     hover:ring-2 hover:ring-blue-500 
                                     transition-all duration-200"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500 
                                      flex items-center justify-center text-white 
                                      hover:ring-2 hover:ring-blue-300 
                                      transition-all duration-200">
                            {getInitials(profileData.name)}
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 w-full flex flex-col items-center gap-2 px-2 mt-6">
                <NavLink to="/dashboard" active={location.pathname === "/dashboard"}>
                    <i className="fi-rr-home text-lg" />
                    {menuOpen && <span className="ml-3">Dashboard</span>}
                </NavLink>

                <NavLink to="/userExcel" active={location.pathname === "/userExcel"}>
                    <i className="fi-rr-note text-lg" />
                    {menuOpen && <span className="ml-3">Tasks</span>}
                </NavLink>

                <NavLink to="/userDone" active={location.pathname === "/userDone"}>
                    <i className="fi-rr-list-check text-lg" />
                    {menuOpen && <span className="ml-3">Completed</span>}
                </NavLink>
            </div>

            {/* Bottom Section */}
            <div className="w-full px-2 space-y-2">
                <button 
                    onClick={toggleDarkMode}
                    className="w-full p-2 rounded-lg flex items-center justify-center
                             hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <i className={`fi ${isDarkMode ? "fi-rr-moon" : "fi-rr-sun"} text-lg`} />
                    {menuOpen && <span className="ml-3">{isDarkMode ? "Dark" : "Light"}</span>}
                </button>

                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-full p-2 rounded-lg flex items-center justify-center
                             hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <i className="fi-rr-menu-burger text-lg" />
                </button>
            </div>
        </motion.nav>
    );
};

const NavLink = ({ children, to, active }) => (
    <Link
        to={to}
        className={`w-full p-2 rounded-lg flex items-center justify-center
                   ${active 
                     ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} 
                   transition-colors`}
    >
        {children}
    </Link>
);

UserNav.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    setMenuOpen: PropTypes.func.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
    isDarkMode: PropTypes.bool.isRequired
};

export default UserNav;
