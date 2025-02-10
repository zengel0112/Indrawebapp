import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
// made by tengis
const AdminNav = ({ menuOpen, setMenuOpen, toggleDarkMode, isDarkMode }) => {

    const location = useLocation();

    const toggleOpen = () => setMenuOpen((prev) => !prev);

    return (
        <nav className={`w-full h-full bg-light-blue dark:bg-dark-blue flex flex-col text-2xl overflow-hidden
            items-center justify-between p-2 py-8 text-white *:w-full *:flex *:flex-col *:items-center *:justify-center`}
        >
            <div className="border-b-slate-400 border-b-2 h-fit">
                <div className="overflow-hidden w-20 h-fit px-3 mb-2">
                    <Link to="/" className="flex justify-center items-center">
                        <img alt="logo" src="/logo.jpg" className="cursor-pointer rounded-full" />
                    </Link>
                </div>
            </div>
            <div className={`flex flex-col gap-1 icons`}>
                <Link to="/adminDashboard">
                    <i className={`${location.pathname === '/adminDashboard' ? 'fi-ss-home' : 'fi-rr-home'} fi`}></i>
                    <span>
                        <p className={menuOpen ? 'inline-block' : 'hidden'}>Dashboard</p>
                    </span>
                </Link>
                <Link to="/add-task">
                    <i className={`${location.pathname === '/add-task' ? 'fi-sr-layer-plus' : 'fi-rr-layer-plus'} fi`}></i>
                    {menuOpen && <span>Add task</span>}
                </Link>
                <Link to="/projects">
                    <i className={`${location.pathname === '/projects' ? 'fi-br-list-check scale-105' : 'fi-rr-list-check'} fi`}></i>
                    {menuOpen && <span>Completed tasks</span>}
                </Link>
                <Link to="/usertasks">
                    <i className={`${location.pathname === '/' ? 'fi-sr-file-edit' : 'fi-rr-file-edit'} fi`}></i>
                    {menuOpen && <span>Admin</span>}
                </Link>
                <Link onClick={toggleDarkMode}>
                    <i className={`fi ${isDarkMode ? "fi-ss-moon" : "fi-rr-sun"}`}></i>
                    {menuOpen && <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>}
                </Link>
            </div>
            <div className="icons">
                <Link onClick={toggleOpen}>
                    <i className={`${location.pathname === '/' ? 'fi-br-menu-burger' : 'fi-rr-menu-burger'} fi cursor-pointer`}></i>
                </Link>
            </div>
        </nav>
    )
}

AdminNav.propTypes = {
    menuOpen: PropTypes.bool,
    setMenuOpen: PropTypes.func,
    toggleDarkMode: PropTypes.func,
    isDarkMode: PropTypes.bool
}

export default AdminNav