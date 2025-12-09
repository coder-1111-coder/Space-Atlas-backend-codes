import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Navbar.css';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    const [user, setUser] = useState(authAPI.getUser());

    useEffect(() => {
        // Update auth state on mount and when storage changes
        const checkAuth = () => {
            setIsAuthenticated(authAPI.isAuthenticated());
            setUser(authAPI.getUser());
        };

        // Listen for storage changes (login/logout in other tabs)
        window.addEventListener('storage', checkAuth);

        // Custom event for same-tab auth changes
        window.addEventListener('authChange', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <span className="brand-text">Space Atlas</span>
                    </Link>

                    <div className="navbar-menu">
                        <Link to="/" className="nav-link">Home</Link>

                        {isAuthenticated ? (
                            <>
                                <button onClick={handleLogout} className="btn btn-sm btn-secondary">
                                    Logout
                                </button>
                                <Link to="/admin" className="btn btn-sm btn-primary">
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-sm btn-primary">
                                Admin Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
