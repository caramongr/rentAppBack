module.exports = app => {
  const towns = require("../controllers/town.controller.js");

  // Create a new Town
  app.post("/towns", towns.create);

  // Retrieve all Towns
  app.get("/towns", towns.findAll);

  // Retrieve a single Town with townId
  app.get("/towns/:townId", towns.findOne);

  // Update a State with townId
  app.put("/towns/:townId", towns.update);

  // Delete a State with townId
  app.delete("/towns/:townId", towns.delete);

  // Create a new State
  app.delete("/towns", towns.deleteAll);
};
