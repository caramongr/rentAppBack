module.exports = app => {
  const countries = require("../controllers/country.controller.js");

  // Create a new Country
  app.post("/countries", countries.create);

  // Retrieve all Countries
  app.get("/countries", countries.findAll);

  // Retrieve a single Countries with countryId
  app.get("/countries/:countryId", countries.findOne);

  // Update a Country with countryId
  app.put("/countries/:countryId", countries.update);

  // Delete a Country with countryId
  app.delete("/countries/:countryId", countries.delete);

  // Create a new Country
  app.delete("/countries", countries.deleteAll);
};
