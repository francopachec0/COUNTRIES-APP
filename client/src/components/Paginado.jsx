import React from 'react';
import styles from '../components/paginado.module.css'

export default function Paginado ({countriesPerPage, allCountries, paginado}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumber.push(i);
    };

    return(
            <nav>
                <ul className={styles.paginado}>
                    { pageNumber && 
                    pageNumber.map(number => (
                        <li className={styles.li} key={number}>
                            <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
    );
};