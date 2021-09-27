const Town = require("../models/town.model.js");

// Create and Save a new town
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log("ssss");
  // Create a Town
  const town = new Town({
    title: req.body.title,
    description: req.body.description,
    photo: req.body.photo,
    priority: req.body.priority,
    metakey: req.body.metakey,
    metadesc: req.body.metadesc,
    stateid: req.body.stateid,
  });

  // Save Town in the database
  Town.create(town, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Town."
      });
    else res.send(data);
  });
};

// Retrieve all Towns from the database.
exports.findAll = (req, res) => {
  Town.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving towns."
      });
    else res.send(data);
  });
};

// Find a single Town with a stateId
exports.findOne = (req, res) => {
  Town.findById(req.params.townId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Town with id ${req.params.townId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Town with id " + req.params.townId
        });
      }
    } else res.send(data);
  });
};

// Update a Town identified by the countryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

Town.updateById(
    req.params.townId,
    new Town(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Town with id ${req.params.townId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Town with id " + req.params.townId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Town with the specified townId in the request
exports.delete = (req, res) => {
  Town.remove(req.params.townId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Town with id ${req.params.townId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Town with id " + req.params.townId
        });
      }
    } else res.send({ message: `Town was deleted successfully!` });
  });
};

// Delete all Towns from the database.
exports.deleteAll = (req, res) => {
  Town.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all towns."
      });
    else res.send({ message: `All Towns were deleted successfully!` });
  });
};
