// src/components/FooterMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaRegCommentDots, FaUser } from 'react-icons/fa';
import '../styles/FooterMenu.css';


function FooterMenu() {
    return (
        <div className="footer-menu">
            <Link to="/home">
                <FaHome />
            </Link>
            <Link to="/pesquisa">
                <FaSearch />
            </Link>
            <Link to="/chat">
                <FaRegCommentDots />
            </Link>
            <Link to="/profile">
                <FaUser />
            </Link>
        </div>
    );
}

export default FooterMenu;
