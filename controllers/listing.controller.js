const Listing = require("../models/listing.model.js");

// Create and Save a new Listing
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log("ssss");
  // Create a Listing
  const listing = new Listing({
    
    title: req.body.title,
    summary: req.body.summary,
    description: req.body.description,
    photo: req.body.photo,
    squaremeters: req.body.squaremeters,
    bedrooms: req.body.bedrooms,
    map: req.body.map,
    pets: req.body.pets,
    emailalert: req.body.emailalert,
    region: req.body.region,
    town: req.body.town,
    state: req.body.state,
    country: req.body.country,
    bathrooms: req.body.bathrooms,
    furniture: req.body.furniture,
    furnitureremove: req.body.furnitureremove,
    amenities: req.body.amenities,
    type: req.body.type,
    floor: req.body.floor,
    priority: req.body.priority,
    metadesc: req.body.metadesc,
    metakey: req.body.metakey,
    price: req.body.price,
    owner: req.body.owner


  });

  // Save Listing in the database
  Listing.create(listing, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Listing."
      });
    else res.send(data);
  });
};

// Retrieve all Listing from the database.
exports.findAll = (req, res) => {
  Listing.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving listing."
      });
    else res.send(data);
  });
};

// Find a single Listing with a liatingId
exports.findOne = (req, res) => {
  Listing.findById(req.params.listingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Listing with id ${req.params.listingId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Listing with id " + req.params.listingId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Listing.updateById(
    req.params.listingId,
    new Listing(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Listing with id ${req.params.listingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Listing with id " + req.params.listingId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Listing.remove(req.params.listingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Listing with id ${req.params.listingId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Listing with id " + req.params.listingId
        });
      }
    } else res.send({ message: `Listing was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Listing.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
