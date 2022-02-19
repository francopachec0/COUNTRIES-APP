import React from 'react';
import { useState } from 'react';
//import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesName } from '../actions';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange (e) {
        e.preventDefault();
        setName('')
        setName(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        if (name.length > 0) {
            dispatch(getCountriesName(name));
            setName('');
        }else{
            alert('¡Write a Country!')
        }                
    }  

    return (
        <div className="search_bar">
            <input type="text" placeholder='Find a Country...' onChange={(e) => handleInputChange(e)}/>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}