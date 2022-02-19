import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, filterByContinent, filterActivity, orderByName, filterByPopulation, getActivities } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import './styles/Card.css'
import './styles/Home.css'


export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [/*order*/, setOrder] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage /*setCountriesPerPage*/] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const activities = useSelector((state) => state.activities);
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
  }

  function handleFilterActivity(e) {
    e.preventDefault();
    dispatch(filterActivity(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)        
};

function handleFilterByPopulation(e) {
  e.preventDefault();
  dispatch(filterByPopulation(e.target.value));
  setCurrentPage(1);
  setOrder(`Oredenado ${e.target.value}`);
}

  return (
    <div>
      <div>
        <div className="top_nav">
      <h1>Countries Api</h1>
      <Link className="link_create" to="/activity">Create your Activity</Link>
      <button className="btn_reload" onClick={(e) => {handleClick(e)}}>Reload all Countries</button>
      <SearchBar />
        </div>
      <div className="filters">
        <select onChange={e => handleOrderByName(e)}>
          <option disabled>Order by Name</option>
          <option value="asc">From A to Z</option>
          <option value="desc">From Z to A</option>
        </select>

        <select onChange={e => handleFilterByPopulation(e)}>
         <option disabled>Order by Population</option>
          <option value="small-countries">Small Countries</option>
          <option value="big-countries">Big Countries</option>
          <option value="all">All</option>
        </select>

        <select onChange={(e) => handleFilterContinent(e)}>
          <option disabled>Filter by Continent</option>
          <option value="All">All</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Oceania">Oceania</option>
        </select>

        <select onChange={e => handleFilterActivity(e)}>
          <option disabled>Filter By Activities</option>
          <option value="All">All Activities</option>
            {activities.map((activity) => (
              <option value={activity.name} key={activity.id}>
                {activity.name}
          </option>
        ))}
        </select>
      </div>
      </div>
      <Paginado
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />
      
      
      <div className="cards">
      {currentCountries?.map((c) => {
        return (
          <Card
            flags={c.flags}
            name={c.name}
            continent={c.continent}
            key={c.id}
          />
        );
      })}
      </div>
      <br />
    </div>
  );
}
