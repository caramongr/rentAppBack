module.exports = app => {
  const regions = require("../controllers/region.controller.js");

  // Create a new Region
  app.post("/regions", regions.create);

  // Retrieve all Region
  app.get("/regions", regions.findAll);

  // Retrieve a single Region with stateId
  app.get("/regions/:regionId", regions.findOne);

  // Update a Region with regionId
  app.put("/regions/:regionId", regions.update);

  // Delete a State with stateId
  app.delete("/regions/:regionId", regions.delete);

  // Create a new State
  app.delete("/regions", regions.deleteAll);
};
