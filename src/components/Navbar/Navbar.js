import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>EXAM.</h2>
            </div>
            <div className="nav-items">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/learn">Learn</Link>
                </li>
            </div>
        </nav>
    );
};

export default Navbar;