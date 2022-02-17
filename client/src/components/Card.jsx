import React from 'react';
import './styles/Card.css'

export default function Card ({flags, name, continent}) {
    return (
        <div className='card'>
            <img className='card_image' src={flags} alt='img not found'/>
            <div className='card_content'>
                <h3>{name}</h3>
                <h5>{continent}</h5>
            </div>        
        </div>
    );
}; 