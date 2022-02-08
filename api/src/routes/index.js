const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getApiInfo, getCountriesDb } = require("./controllers/country.js");
const axios = require("axios");
const express = require("express");
const { Country, Activity } = require("../db.js");
const router = Router();
router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
  try {
    const name = req.query.name;
    let countriesTotal = await getCountriesDb();
    //console.log('COUNTRIESDB: ', countriesTotal)
    if (name) {
      // sí hay un nombre por query
      let countryName = await countriesTotal.filter((c) =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
      countryName.length // sí hay algún nombre, o algo
        ? res.status(200).send(countryName)
        : res
            .status(404)
            .send("Sorry, the country you are looking for is not here.");
    } else {
      res.status(200).send(countriesTotal); // el otro caso es que no haya un query y manda TODOS los countries
      //console.log('COUNTRIESTOTAL: ', countriesTotal);
    }
  } catch (err) {
    res.send(err);
  }
});

router.get("/countries/:id", async (req, res) => {
  const id = req.params.id;
  let countriesTotal = await getCountriesDb();
  if (id) {
    let countryId = await countriesTotal.filter(
      (c) => c.id.toLowerCase() == id.toLocaleLowerCase()
    );
    countryId.length
      ? res.status(200).json(countryId)
      : res.status(404).send("Country not found.");
  }
});

router.post('/activity', async (req, res) => {
  const { name,
          difficulty, 
          duration, 
          season,
          countries } = req.body;

  try {
      const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });

      countries.forEach(async (c) => {
        const countryActivity = await Country.findOne({
          where: {
            name: c,
          },
        });
        await newActivity.addCountry(countryActivity);
      });
      res.status(200).send("Activity created.");
  } catch (error) {
    res.status(404).send(error);
  }
});

  /*
  {
    "name": "surf",
    "difficulty": "4",
    "duration": "4",
    "season": "Summer",
  }
  */

module.exports = router;
