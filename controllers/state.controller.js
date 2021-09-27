const State = require("../models/state.model.js");

// Create and Save a new state
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log("ssss");
  // Create a Country
  const state = new State({
    title: req.body.title,
    description: req.body.description,
    photo: req.body.photo,
    priority: req.body.priority,
    metakey: req.body.metakey,
    metadesc: req.body.metadesc,
    countryid: req.body.countryid,
  });

  // Save State in the database
 State.create(state, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the State."
      });
    else res.send(data);
  });
};

// Retrieve all States from the database.
exports.findAll = (req, res) => {
  State.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries."
      });
    else res.send(data);
  });
};

// Find a single Country with a countryId
exports.findOne = (req, res) => {
  State.findById(req.params.stateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found State with id ${req.params.stateId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving State with id " + req.params.stateId
        });
      }
    } else res.send(data);
  });
};

// Update a State identified by the countryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

State.updateById(
    req.params.stateId,
    new State(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found State with id ${req.params.stateId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating State with id " + req.params.stateId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a State with the specified customerId in the request
exports.delete = (req, res) => {
  State.remove(req.params.stateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found State with id ${req.params.stateId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete State with id " + req.params.stateId
        });
      }
    } else res.send({ message: `State was deleted successfully!` });
  });
};

// Delete all States from the database.
exports.deleteAll = (req, res) => {
  State.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all states."
      });
    else res.send({ message: `All States were deleted successfully!` });
  });
};
