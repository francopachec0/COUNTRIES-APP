const axios = require("axios");
const { Country, Activity } = require("../../db.js"); // me traigo los modelos de la db

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await apiUrl.data.map((c) => {
    return {
      id: c.cca3,
      name: c.name.common,
      flags: c.flags[1],
      continent: c.continents[0],
      capital: c.capital ? c.capital[0] : "Not found",
      subregion: c.subregion ? c.subregion : "Not found",
      area: c.area,
      population: c.population,
    };
  });
  apiInfo.forEach(async (c) => {
    await Country.findOrCreate({
        where: {
        id: c.id,
        name: c.name,
        flags: c.flags,
        continent: c.continent,
        capital: c.capital,
        subregion: c.subregion,
        area: c.area,
        population: c.population
      }
    });
  })
};

const getCountriesDb = async () => {
  let infoDb = await Country.findAll({
      include: {
          model: Activity, // incluyo el model Activity pq el model Country no lo tiene
          attributes: ['name'],
      },
  });
  //console.log('INFODB: ', infoDb)
  return infoDb;
  
};

module.exports = {
  getApiInfo,
  getCountriesDb
};

