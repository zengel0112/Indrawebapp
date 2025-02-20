import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import PropTypes from 'prop-types'

const AdminNav = ({ menuOpen, setMenuOpen, toggleDarkMode, isDarkMode }) => {
    const location = useLocation()

    return (
        <motion.nav className="w-full h-full bg-white dark:bg-gray-800 flex flex-col 
                              items-center justify-between py-4">
            {/* Navigation Links */}
            <div className="flex-1 w-full flex flex-col gap-2 px-2 mt-6">
                <NavLink to="/adminDashboard" active={location.pathname === "/adminDashboard"}>
                    <i className={`fi ${location.pathname === '/adminDashboard' ? 'fi-ss-home' : 'fi-rr-home'} text-lg`} />
                    {menuOpen && <span className="ml-3">Менежрийн самбар</span>}
                </NavLink>

                <NavLink to="/add-task" active={location.pathname === "/add-task"}>
                    <i className={`fi ${location.pathname === '/add-task' ? 'fi-sr-layer-plus' : 'fi-rr-layer-plus'} text-lg`} />
                    {menuOpen && <span className="ml-3">Төсөл нэмэх</span>}
                </NavLink>

                <NavLink to="/projects" active={location.pathname === "/projects"}>
                    <i className={`fi ${location.pathname === '/projects' ? 'fi-br-list-check scale-105' : 'fi-rr-list-check'} text-lg`} />
                    {menuOpen && <span className="ml-3">Анги дүүргэлт</span>}
                </NavLink>
            </div>

            {/* Bottom Section */}
            <div className="w-full px-2 space-y-2">
                <button 
                    onClick={toggleDarkMode}
                    className="w-full p-2 rounded-lg flex items-center justify-center min-h-[40px]
                             hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <div className="flex items-center justify-center">
                        <i className={`fi ${isDarkMode ? "fi-rr-moon" : "fi-rr-sun"} text-lg`} />
                        {menuOpen && <span className="ml-3">{isDarkMode ? "Dark" : "Light"}</span>}
                    </div>
                </button>

                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-full p-2 rounded-lg flex items-center justify-center min-h-[40px]
                             hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <div className="flex items-center justify-center">
                        <i className="fi-rr-menu-burger text-lg" />
                    </div>
                </button>
            </div>
        </motion.nav>
    )
}

const NavLink = ({ children, to, active }) => (
    <Link
        to={to}
        className={`p-2 rounded-lg flex items-center justify-center min-h-[40px]
                   ${active ? 'bg-blue-500 text-white' : 
                   'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} 
                   transition-colors`}
    >
        <div className="flex items-center justify-center">
            {children}
        </div>
    </Link>
)

AdminNav.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    setMenuOpen: PropTypes.func.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
    isDarkMode: PropTypes.bool.isRequired
}

export default AdminNav
