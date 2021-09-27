const Region = require("../models/region.model.js");

// Create and Save a new region
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log("ssss");
  // Create a Town
  const region = new Region({
    title: req.body.title,
    description: req.body.description,
    photo: req.body.photo,
    priority: req.body.priority,
    metakey: req.body.metakey,
    metadesc: req.body.metadesc,
    townid: req.body.townid,
  });

  // Save Region in the database
  Region.create(region, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Region."
      });
    else res.send(data);
  });
};

// Retrieve all Regions from the database.
exports.findAll = (req, res) => {
  Region.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving regions."
      });
    else res.send(data);
  });
};

// Find a single Regionwith a regionId
exports.findOne = (req, res) => {
  Region.findById(req.params.regionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Region with id ${req.params.regionId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Region with id " + req.params.regionId
        });
      }
    } else res.send(data);
  });
};

// Update a Region identified by the regionId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

Region.updateById(
    req.params.regionId,
    new Region(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Region with id ${req.params.regionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Region with id " + req.params.regionId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Region with the specified regionId in the request
exports.delete = (req, res) => {
  Region.remove(req.params.regionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Region with id ${req.params.regionId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Region with id " + req.params.regionId
        });
      }
    } else res.send({ message: `Region was deleted successfully!` });
  });
};

// Delete all Regions from the database.
exports.deleteAll = (req, res) => {
  Region.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all regions."
      });
    else res.send({ message: `All regions were deleted successfully!` });
  });
};
