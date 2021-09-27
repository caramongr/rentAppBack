module.exports = app => {
  const states = require("../controllers/state.controller.js");

  // Create a new State
  app.post("/states", states.create);

  // Retrieve all States
  app.get("/states", states.findAll);

  // Retrieve a single State with stateId
  app.get("/states/:stateId", states.findOne);

  // Update a State with stateId
  app.put("/states/:stateId", states.update);

  // Delete a State with stateId
  app.delete("/states/:stateId", states.delete);

  // Create a new State
  app.delete("/states", states.deleteAll);
};
