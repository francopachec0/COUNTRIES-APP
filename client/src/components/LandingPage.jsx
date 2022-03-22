import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';

export default function LandingPage() {
    return(
        <div className='landing'>
            <br />
            <h1 className='landing_title'>¡Welcome to Countries!</h1>
            <Link to = '/home'>
                <button className='landing_btn'>START</button>
            </Link>
            <h5 className='footer'>Mini App developed by Franco Pacheco, Full-Stack Developer Student</h5>
        </div>
    );
};