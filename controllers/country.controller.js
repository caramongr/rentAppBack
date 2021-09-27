const Country = require("../models/country.model.js");

// Create and Save a new Country
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log("ssss");
  // Create a Country
  const country = new Country({
    title: req.body.title,
    description: req.body.description,
    photo: req.body.photo,
    priority: req.body.priority,
    metakey: req.body.metakey,
    metadesc: req.body.metadesc
  });

  // Save Country in the database
  Country.create(country, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Country."
      });
    else res.send(data);
  });
};

// Retrieve all Countries from the database.
exports.findAll = (req, res) => {
  Country.getAll((err, data) => {
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
  Country.findById(req.params.countryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Country with id ${req.params.countryId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Country with id " + req.params.countryId
        });
      }
    } else res.send(data);
  });
};

// Update a Country identified by the countryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  Country.updateById(
    req.params.countryId,
    new Country(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Country with id ${req.params.countryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Country with id " + req.params.countryId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Country with the specified customerId in the request
exports.delete = (req, res) => {
  Country.remove(req.params.countryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Country with id ${req.params.countryId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Country with id " + req.params.countryId
        });
      }
    } else res.send({ message: `Country was deleted successfully!` });
  });
};

// Delete all Countries from the database.
exports.deleteAll = (req, res) => {
  Country.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all countries."
      });
    else res.send({ message: `All Countries were deleted successfully!` });
  });
};
