// src/components/FooterMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaRegCommentDots, FaUser } from 'react-icons/fa';
import { PiBooksBold } from "react-icons/pi";
import '../styles/FooterMenu.css';


function FooterMenu() {
    return (
        <div className="footer-menu">
            <Link to="/home">
                <FaHome />
            </Link>
            <Link to="/CadastroProjeto">
            <PiBooksBold />
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
