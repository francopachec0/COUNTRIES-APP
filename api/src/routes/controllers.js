const axios = require("axios");
const { Country, Activity } = require("../db.js"); // me traigo los modelos de la db

// funciones controladoras

const getApiInfo = async () => {
  let countries = await axios.get("https://restcountries.com/v3/all");
  countries = await axios.all(
    countries.data.map((c) => {
      Country.findOrCreate({
        where: {
          id: c.cca3,
          name: c.name.common,
          flags: c.flags[1],
          continent: c.continents[0],
          capital: c.capital ? c.capital[0] : "Not found",
          subregion: c.subregion ? c.subregion : "Not found",
          area: c.area,
          population: c.population,
        },
      });
      return "Database loaded.";
    })
  );
};

console.log(getApiInfo());

module.exports = {
    getApiInfo
};