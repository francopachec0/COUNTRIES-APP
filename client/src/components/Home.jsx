import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div>
      <h1>Countries Api</h1>
      <Link to="/activity">Create your Activity</Link> <br />
      <button onClick={(e) => {handleClick(e)}}>Reload all Countries</button>
      
      <div>
        <select>
          <option value="order_by_name">Order by Name</option>
          <option value="asc">From A to Z</option>
          <option value="desc">From Z to A</option>
        </select>

        <select>
          <option value="order_by_population">Order by Population</option>
          <option value="small-countries">Small Countries</option>
          <option value="big-countries">Big Countries</option>
        </select>

        <select>
          <option value="">Filter by Continent</option>
          <option value="">...</option>
        </select>

        <select>
          <option value="">Filter by Activities</option>
          <option value="">...</option>
        </select>
      </div>
      
      <Paginado
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />

      <br />
      
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
  );
}
