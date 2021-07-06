import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>E.</h2>
            </div>
            <div className="nav-items">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/learn">Learn</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </div>
        </nav>
    );
};

export default Navbar;