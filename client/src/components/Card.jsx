import React from 'react';

export default function Card ({flags, name, continent}) {
    return (
        <div>
            <img src={flags} alt='img not found' width='150px' height='80px' />
            <h3>{name}</h3>
            <h5>{continent}</h5>
        </div>
    );
}; 