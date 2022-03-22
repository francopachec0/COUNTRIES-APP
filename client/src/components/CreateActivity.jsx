import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getCountries, postActivity } from '../actions';

export default function CreateActivity () {
    const dispatch = useDispatch();
    const countries = useSelector((state) => (state.countries));
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    })

    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleCheck (e) {
        if (e.target.checked) {
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    function handleSelect (e) {
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(postActivity(input));
        alert('¡Activity Created!')
        navigate('/home')
        setInput({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countries: []
        })
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    return (
        <div>
            <Link to="/home">
                <button>Return to Home</button>
            </Link>
            <h1>¡Create your Activity!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={input.name} name='name' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Difficulty: </label>
                    <select name="difficulty" value={input.difficulty} onChange={(e) => handleChange(e)}>
                        <option value="1">1 - Very Easy</option>
                        <option value="2">2 - Easy</option>
                        <option value="3">3 - Medium</option>
                        <option value="4">4 - Hard</option>
                        <option value="5">5 - Very Hard</option>
                    </select>
                </div>
                <div>
                    <label>Duration: </label>
                    <select name="duration" value={input.duration} onChange={(e) => handleChange(e)}>
                        <option value="1">1 Hour</option>
                        <option value="2">2 Hours</option>
                        <option value="3">3 Hours</option>
                        <option value="4">4 Hours</option>
                        <option value="5">5 Hours</option>
                        <option value="6">6 Hours</option>
                        <option value="7">7 Hours</option>
                        <option value="8">8 Hours</option>
                        <option value="9">9 Hours</option>
                        <option value="10">10 Hours</option>
                        <option value="11">11 Hours</option>
                        <option value="12">12 Hours</option>
                        <option value="13">13 Hours</option>
                        <option value="14">14 Hours</option>
                        <option value="15">15 Hours</option>
                        <option value="16">16 Hours</option>
                        <option value="17">17 Hours</option>
                        <option value="18">18 Hours</option>
                        <option value="19">19 Hours</option>
                        <option value="20">20 Hours</option>
                        <option value="21">21 Hours</option>
                        <option value="22">22 Hours</option>
                        <option value="23">23 Hours</option>
                        <option value="24">24 Hours</option>
                    </select>
                </div>
                <div>
                    <label>Season: </label>
                    <label><input type="checkbox" name='Winter' value='Winter' onChange={(e) => handleCheck(e)}/>Winter</label>
                    <label><input type="checkbox" name='Autumn' value='Autumn' onChange={(e) => handleCheck(e)}/>Autumn</label>
                    <label><input type="checkbox" name='Spring' value='Spring' onChange={(e) => handleCheck(e)}/>Spring</label>
                    <label><input type="checkbox" name='Summer' value='Summer' onChange={(e) => handleCheck(e)}/>Summer</label>
                </div>
                <div>
                    <label>Country: </label>
                    <select name="countries" onChange={(e) => handleSelect(e)}>
                        {
                            countries.map((c) => (
                                <option value={c.name}>{c.name}</option>
                            ))
                        }
                    </select>
                    <ul>
                        <li>
                            {input.countries.map(c => c + ", ")}
                        </li>
                    </ul>
                </div>
                <button type='submit'>Create Activity</button>
            </form>
        </div>
    )
};
