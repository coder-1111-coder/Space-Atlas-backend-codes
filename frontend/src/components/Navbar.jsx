import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Navbar.css';

function Navbar() {
    const isAuthenticated = authAPI.isAuthenticated();
    const user = authAPI.getUser();

    const handleLogout = () => {
        authAPI.logout();
        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <span className="brand-icon">🌌</span>
                        <span className="brand-text">Space Atlas</span>
                    </Link>

                    <div className="navbar-menu">
                        <Link to="/" className="nav-link">Home</Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/admin" className="nav-link">Dashboard</Link>
                                <div className="nav-user">
                                    <span className="user-email">{user?.email}</span>
                                    <button onClick={handleLogout} className="btn btn-sm btn-secondary">
                                        Logout
                                    </button>
                                </div>
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
