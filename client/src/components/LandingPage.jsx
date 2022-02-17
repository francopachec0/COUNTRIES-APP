import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';

export default function LandingPage() {
    return(
        <div>
            <h1>¡Welcome!</h1>
            <Link to = '/home'>
                <button>START</button>
            </Link>
            <h5>Mini App developed by Franco Pacheco, Full-Stack Developer Student.</h5>
        </div>
    );
};